import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../Component/BaseColour';
import StatusBars from '../Component/StatusBars';
import ListEmptyComponent from '../Component/ListEmptyComponent';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { toggleTheme } from '../../../Redux/Action/DarkModeAction';
import { DefaultTheme, DarkTheme } from 'react-native-paper';
import { SearchAction } from '../../../Redux/Action/SearchAction';

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const isDarkMode = useSelector((state) => state?.DarkModeReducer?.isDarkMode);
    const { repositories, loading, error } = useSelector(state => state.SearchReducer);
    const [search, setSearch] = useState('')
    const theme = isDarkMode ? DarkTheme : DefaultTheme;

    useEffect(() => {
        handleSearch('query')
    }, [])

    const handleSearch = (query) => {
        if (query) {
            dispatch(SearchAction(query));
            console.log(query);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { item: item })} activeOpacity={0.9}
                style={isDarkMode ? styles.itemContainerDark : styles.itemContainerLight}>
                <View style={{}}>
                    <Image source={{ uri: item?.owner?.avatar_url }} style={styles.Image} />
                </View>
                <View style={styles.MainRepo}>
                    <View style={styles.RepoConatiner}>
                        <Text style={isDarkMode ? styles.ListtitleDarkMode : styles.ListtitleLightMode}>Repository Name:</Text>
                        <Text style={styles.Listname}> {item.name.length > 15 ? item.name.slice(0, 16) + ' ...' : item.name}</Text>
                    </View>
                    <View style={styles.RepoConatiner}>
                        <Text style={isDarkMode ? styles.ListtitleDarkMode : styles.ListtitleLightMode}>Name :</Text>
                        <Text style={styles.Listname}> {item?.owner?.login}</Text>
                    </View>
                    <View style={styles.RepoConatiner}>
                        <Text style={isDarkMode ? styles.ListtitleDarkMode : styles.ListtitleLightMode}>Language :</Text>
                        <Text style={styles.Listname}> {item?.language}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const ListFooter = () => {
        return (
            <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'grey', fontSize: 14 }}>{repositories?.items?.length > 10 ? 'You can search for repositories by name' : null}</Text>
            </View>
        )
    }

    return (
        <View style={isDarkMode ? styles.containerDarkoMode : styles.containerLightMode}>
            <StatusBars />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                <View style={styles.headingtxt}>
                    <Text style={styles.centerText}>Home</Text>
                    <TouchableOpacity style={{ bottom: 6, position: 'absolute', right: '5%', bottom: 12 }} onPress={() => {
                        if (theme) {
                            dispatch(toggleTheme())
                        } else {
                            dispatch(toggleTheme())
                        }
                    }}>
                        {theme ? <MaterialIcons name="dark-mode" size={19} color={'#fff'} style={{}} />
                            : <Entypo name="light-down" size={19} color={'#fff'} style={{}} />}
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.SearchBar}>
                <View style={isDarkMode ? styles.SearchConatinerLightMode : styles.SearchConatinerDarkMode}>
                    <View style={{ bottom: 2, }}>
                        <EvilIcons name="search" size={19} color={isDarkMode ? '#fff' : "#000"} style={{ padding: 6, paddingHorizontal: 6 }} />
                    </View>
                    <TextInput placeholderTextColor={isDarkMode ? '#fff' : '#000'} placeholder='Search repository' value={search} onChangeText={(txt) => { setSearch(txt); handleSearch(txt) }} style={isDarkMode ? styles.TextInputLightMode : styles.TextInputDarkMode} />
                    {search ? <TouchableOpacity onPress={() => { setSearch(''); handleSearch('query') }}>
                        <Entypo name="circle-with-cross" size={19} color={isDarkMode ? '#fff' : "#000"} />
                    </TouchableOpacity> : null}
                </View>
            </View>
            {/* filterData(txt); */}
            <FlatList data={repositories?.items} renderItem={renderItem} contentContainerStyle={{ paddingBottom: '8%' }}
                keyExtractor={item => item.id} ListEmptyComponent={ListEmptyComponent} ListFooterComponent={ListFooter} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    containerLightMode: { flex: 1, backgroundColor: '#fff' },
    containerDarkoMode: { flex: 1, backgroundColor: "#000" },
    centerText: { color: '#fff', textAlign: 'center', bottom: 6, fontWeight: '800', fontSize: 16 },
    headingtxt: { padding: 8, backgroundColor: color.base, width: '100%', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, },
    itemContainerLight: { backgroundColor: "#fff", borderWidth: 1, borderColor: '#fff', elevation: 16, margin: 6, borderRadius: 6, padding: 12, width: '95%', alignSelf: 'center', flexDirection: 'row', },
    itemContainerDark: { backgroundColor: '#000', borderWidth: 1, borderColor: '#fff', elevation: 16, margin: 6, borderRadius: 6, padding: 12, width: '95%', alignSelf: 'center', flexDirection: 'row', },
    Image: { width: 80, height: 60, borderRadius: 5, resizeMode: 'contain', borderWidth: 1, borderColor: 'grey' },
    ListtitleDarkMode: { color: "#fff", fontWeight: '700' },
    ListtitleLightMode: { color: '#000', fontWeight: '700' },
    Listname: { color: 'grey', fontWeight: '700', textTransform: 'capitalize' },
    TextInputLightMode: { paddingVertical: 8, width: '80%', color: '#fff', fontWeight: '500', padding: 6 },
    TextInputDarkMode: { paddingVertical: 8, width: '80%', color: '#000', fontWeight: '500', padding: 6 },
    MainRepo: { alignSelf: 'center', width: '80%' },
    SearchBar: {
        flexDirection: 'row', justifyContent: 'space-between', width: '95%',
        borderRadius: 6, margin: 12, paddingHorizontal: 2, alignSelf: 'center', padding: 4,
    },
    RepoConatiner: { flexDirection: 'row', width: '75%', left: 8, },
    SearchConatinerLightMode: { flexDirection: 'row', width: '100%', backgroundColor: '#000', borderWidth: 1, borderColor: '#fff', elevation: 6, borderRadius: 6, alignItems: "center", },
    SearchConatinerDarkMode: { flexDirection: 'row', width: '100%', backgroundColor: "#fff", borderWidth: 1, borderColor: '#fff', elevation: 6, borderRadius: 6, alignItems: "center", },
    switchContainer: { flexDirection: 'row', alignItems: 'center', },
})

