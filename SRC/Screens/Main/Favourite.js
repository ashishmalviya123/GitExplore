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

  const FavoriteRes = useSelector(state => state.FavoriteReducer?.favorites);
  const isDarkMode = useSelector((state) => state?.DarkModeReducer?.isDarkMode);

  const [FavoriteList, setFavoriteList] = useState(FavoriteRes);

  useEffect(() => {
    if (FavoriteRes) {
      setFavoriteList(FavoriteRes);
    }
  }, [isFocused])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { item: item })} activeOpacity={0.9} style={isDarkMode ? styles.renderItemContinerDark : styles.renderItemContinerLight}>
        <View>
          <Image source={{ uri: item?.owner?.avatar_url }} style={styles.Image} />
        </View>
        <View style={styles.RepoContainer}>
          <View style={styles.RepoText}>
            <Text style={isDarkMode ? styles.ListtitleDarkMode : styles.ListtitleLightMode}>Repository Name:</Text>
            <Text style={styles.Listname}> {item.name.length > 15 ? item.name.slice(0, 15) + ' ...' : item.name}</Text>
          </View>
          <View style={styles.RepoText}>
            <Text style={isDarkMode ? styles.ListtitleDarkMode : styles.ListtitleLightMode}>Name :</Text>
            <Text style={styles.Listname}> {item?.owner?.login}</Text>
          </View>
          <View style={styles.RepoText}>
            <Text style={isDarkMode ? styles.ListtitleDarkMode : styles.ListtitleLightMode}>Language :</Text>
            <Text style={styles.Listname}> {item?.language}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={isDarkMode ? styles.containerDarkoMode : styles.containerLightMode}>
      <StatusBars />
      <Heading Title={'Favorite'} onPress={() => navigation.goBack()} />
      <FlatList data={FavoriteList} renderItem={renderItem} contentContainerStyle={{ paddingBottom: '8%' }}
        keyExtractor={item => item.id} ListEmptyComponent={ListEmptyComponent} />
    </View>
  )
}

export default Favourite

const styles = StyleSheet.create({
  containerLightMode: { flex: 1, backgroundColor: '#fff' },
  containerDarkoMode: { flex: 1, backgroundColor: "#000" },
  centerText: { textAlign: 'center', color: '#fff', bottom: 6, fontWeight: '800', fontSize: 16 },
  headingtxt: { alignContent: 'center', padding: 8, width: '100%', alignSelf: 'center', backgroundColor: color.base, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, },
  RepoContainer: { alignSelf: 'center', width: '80%' },
  RepoText: { flexDirection: 'row', width: '75%', left: 8, },
  renderItemContinerDark: { backgroundColor: "#000", borderWidth: 1, borderColor: '#fff', elevation: 6, margin: 6, borderRadius: 6, padding: 12, width: '95%', alignSelf: 'center', flexDirection: 'row', },
  renderItemContinerLight: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#fff', elevation: 6, margin: 6, borderRadius: 6, padding: 12, width: '95%', alignSelf: 'center', flexDirection: 'row', },
  Image: { width: 80, height: 60, borderRadius: 5, resizeMode: 'contain', borderWidth: 1, borderColor: 'grey' },
  ListtitleDarkMode: { color: "#fff", fontWeight: '700' },
  ListtitleLightMode: { color: '#000', fontWeight: '700' },
  Listname: { color: 'grey', fontWeight: '700', textTransform: 'capitalize' },
})
