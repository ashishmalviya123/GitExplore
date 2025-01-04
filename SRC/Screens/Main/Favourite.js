import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../Component/BaseColour';
import StatusBars from '../Component/StatusBars';
import ListEmptyComponent from '../Component/ListEmptyComponent';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Heading from '../Component/Heading';

const Favourite = ({ navigation }) => {
  const isFocused = useIsFocused()

  const RepositoryRes = useSelector(state => state?.GitRepositoryReducer);
  const FavoriteRes = useSelector(state => state.FavoriteReducer?.favorites);
  const isDarkMode = useSelector((state) => state?.DarkModeReducer?.isDarkMode);

  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState(FavoriteRes);

  useEffect(() => {
    if (FavoriteRes) {
      setFilteredData(FavoriteRes);
    }
  }, [isFocused])

  const filterData = (text) => {
    if (search == '') {
      setFilteredData(RepositoryRes?.data?.items);
    } else {
      const filtered = RepositoryRes?.data?.items?.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { item: item })} activeOpacity={0.9} style={styles.renderItemContiner}>
        <View>
          <Image source={{ uri: item?.owner?.avatar_url }} style={styles.Image} />
        </View>
        <View style={styles.RepoContainer}>
          <View style={styles.RepoText}>
            <Text style={styles.Listtitle}>Repository Name:</Text>
            <Text style={styles.Listname}> {item.name.length > 15 ? item.name.slice(0, 15) + ' ...' : item.name}</Text>
          </View>
          <View style={styles.RepoText}>
            <Text style={styles.Listtitle}>Name :</Text>
            <Text style={styles.Listname}> {item?.owner?.login}</Text>
          </View>
          <View style={styles.RepoText}>
            <Text style={styles.Listtitle}>Language :</Text>
            <Text style={styles.Listname}> {item?.language}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: isDarkMode ? "#000" : '#fff' },
    centerText: { textAlign: 'center', color: '#fff', bottom: 6, fontWeight: '800', fontSize: 16 },
    headingtxt: { alignContent: 'center', padding: 8, width: '100%', alignSelf: 'center', backgroundColor: color.base, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, },
    RepoContainer: { alignSelf: 'center', width: '80%' },
    RepoText: { flexDirection: 'row', width: '75%', left: 8, },
    renderItemContiner: { backgroundColor: isDarkMode ? "#000" : '#fff', borderWidth: 1, borderColor: '#fff', elevation: 6, margin: 6, borderRadius: 6, padding: 12, width: '95%', alignSelf: 'center', flexDirection: 'row', },
    Image: { width: 80, height: 60, borderRadius: 5, resizeMode: 'contain', borderWidth: 1, borderColor: 'grey' },
    Listtitle: { color: isDarkMode ? "#fff" : '#000', fontWeight: '700' },
    Listname: { color: 'grey', fontWeight: '700', textTransform: 'capitalize' },
    TextInput: { paddingVertical: 8, width: '80%', color: isDarkMode ? '#ffff':"#000" , fontWeight: '500', padding: 6 },
    SearchBar: {
      borderRadius: 6, backgroundColor: isDarkMode ? "#000" : '#fff', borderWidth: 1, borderColor: '#fff', elevation: 6, margin: 12, paddingHorizontal: 2, alignSelf: 'center', padding: 4, width: '95%'
    },
    SearchContainer: { flexDirection: 'row', alignItems: "center", },
    SearchIconContainer: { bottom: 2, alignSelf: 'center' },
  })

  return (
    <View style={styles.container}>
      <StatusBars />
      <Heading Title={'Favorite'} onPress={() => navigation.goBack()} />
      <View style={styles.SearchBar}>
        <View style={styles.SearchContainer}>
          <View style={styles.SearchIconContainer}>
            <EvilIcons name="search" size={19} color={isDarkMode ? '#fff' : "#000"} style={{ padding: 6, paddingHorizontal: 6 }} />
          </View>
          <TextInput placeholderTextColor={isDarkMode ? '#fff' : "#000"} placeholder='Search favorite repository' value={search} onChangeText={(txt) => { setSearch(txt); filterData(txt) }} style={styles.TextInput} />
          {search ? <TouchableOpacity onPress={() => { setFilteredData(RepositoryRes?.data?.items); setSearch('') }}>
            <Entypo name="circle-with-cross" size={19} color={isDarkMode ? '#fff' : "#000"} />
          </TouchableOpacity> : null}
        </View>
      </View>
      <FlatList data={filteredData} renderItem={renderItem} contentContainerStyle={{ paddingBottom: '8%' }}
        keyExtractor={item => item.id} ListEmptyComponent={ListEmptyComponent} />
    </View>
  )
}

export default Favourite

