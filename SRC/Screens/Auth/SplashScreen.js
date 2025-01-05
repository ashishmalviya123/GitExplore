import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { SearchAction } from '../../../Redux/Action/SearchAction';

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const isDarkMode = useSelector((state) => state?.DarkModeReducer?.isDarkMode);

    useEffect(() => {
        handleSearch('query')
    }, [])

    const handleSearch = (query) => {
        dispatch(SearchAction(query));
    };

    const styles = StyleSheet.create({
        mainContainer: { flex: 1, justifyContent: 'center', backgroundColor: isDarkMode ? "#000" : '#fff', alignContent: 'center' },
        Button: { backgroundColor: 'blue', alignSelf: 'center', justifyContent: 'center', width: '80%', borderRadius: 50, flexDirection: 'row' },
        Text: { padding: '3%', textAlign: 'center', width: 140, fontSize: 19, color: '#fff', }
    })

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity activeOpacity={0.9} style={styles.Button} onPress={() => { handleSearch('query'); navigation.navigate('Bottom') }}>
                <Text style={styles.Text}>Get Started</Text>
                <FontAwesome5 name="arrow-right" size={19} color="#fff" style={{ alignSelf: "center", }} />
            </TouchableOpacity>
        </View>
    )
}

export default SplashScreen

