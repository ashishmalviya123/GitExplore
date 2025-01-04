import { FlatList, Image, StyleSheet, Button, Text, TextInput, TouchableOpacity, View, Appearance } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../Component/BaseColour';
import StatusBars from '../Component/StatusBars';
import ListEmptyComponent from '../Component/ListEmptyComponent';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { GitRepositoryAction } from '../../../Redux/Action/GitRepositoryAction';
import { useIsFocused } from '@react-navigation/native';
import { SearchBar } from 'react-native-screens';
import { toggleTheme } from '../../../Redux/Action/DarkModeAction';
import { DefaultTheme, DarkTheme } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const RepositoryRes = useSelector(state => state?.GitRepositoryReducer)
    const isDarkMode = useSelector((state) => state?.DarkModeReducer?.isDarkMode);
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState(RepositoryRes?.data?.items);

    // Define light and dark themes for react-native-paper
    const theme = isDarkMode ? DarkTheme : DefaultTheme;

    useEffect(() => {
        dispatch(GitRepositoryAction());
    }, [isFocused]);

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
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { item: item })} activeOpacity={0.9} style={{ backgroundColor: isDarkMode ? "#000" : '#fff', borderWidth: 1, borderColor: '#fff', elevation: 16, margin: 6, borderRadius: 6, padding: 12, width: '95%', alignSelf: 'center', flexDirection: 'row', }}>
                <View style={{}}>
                    <Image source={{ uri: item?.owner?.avatar_url }} style={styles.Image} />
                </View>
                <View style={styles.MainRepo}>
                    <View style={styles.RepoConatiner}>
                        <Text style={styles.Listtitle}>Repository Name:</Text>
                        <Text style={styles.Listname}> {item.name.length > 15 ? item.name.slice(0, 16) + ' ...' : item.name}</Text>
                    </View>
                    <View style={styles.RepoConatiner}>
                        <Text style={styles.Listtitle}>Name :</Text>
                        <Text style={styles.Listname}> {item?.owner?.login}</Text>
                    </View>
                    <View style={styles.RepoConatiner}>
                        <Text style={styles.Listtitle}>Language :</Text>
                        <Text style={styles.Listname}> {item?.language}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: isDarkMode ? "#000" : '#fff' },
        centerText: { color: '#fff', textAlign: 'center', bottom: 6, fontWeight: '800', fontSize: 16 },
        headingtxt: { padding: 8, backgroundColor: color.base, width: '100%', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, },
        Image: { width: 80, height: 60, borderRadius: 5, resizeMode: 'contain', borderWidth: 1, borderColor: 'grey' },
        Listtitle: { color: isDarkMode ? '#fff' : "#000", fontWeight: '700' },
        Listname: { color: 'grey', fontWeight: '700', textTransform: 'capitalize' },
        TextInput: { paddingVertical: 8, width: '80%', color: '#fff', fontWeight: '500', padding: 6 },
        MainRepo: { alignSelf: 'center', width: '80%' },
        SearchBar: {
            flexDirection: 'row', justifyContent: 'space-between', width: '95%',
            borderRadius: 6, margin: 12, paddingHorizontal: 2, alignSelf: 'center', padding: 4,
        },
        RepoConatiner: { flexDirection: 'row', width: '75%', left: 8, },
        SearchConatiner: { flexDirection: 'row', width: '100%', backgroundColor: isDarkMode ? "#000" : '#fff', borderWidth: 1, borderColor: '#fff', elevation: 6, borderRadius: 6, alignItems: "center", },
    })

    return (
        <View style={styles.container}>
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
                        {/* <Text style={{ color: 'pink', textAlign: 'center' }}>{theme ? 'Dark' : 'LIGHT'}</Text> */}

                        {theme ? <Entypo name="light-down" size={19} color={'#fff'} style={{}} /> :
                            <MaterialIcons name="dark-mode" size={19} color={'#fff'} style={{}} />}
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.SearchBar}>
                <View style={styles.SearchConatiner}>
                    <View style={{ bottom: 2, }}>
                        <EvilIcons name="search" size={19} color={isDarkMode ? '#fff' : "#000"} style={{ padding: 6, paddingHorizontal: 6 }} />
                    </View>
                    <TextInput placeholderTextColor={isDarkMode ? '#fff' : '#000'} placeholder='Search repository' value={search} onChangeText={(txt) => { setSearch(txt); filterData(txt) }} style={styles.TextInput} />
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

export default Home

