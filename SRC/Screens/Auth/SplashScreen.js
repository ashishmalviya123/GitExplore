import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { GitRepositoryAction } from '../../../Redux/Action/GitRepositoryAction';

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    
    useEffect(() => {
        dispatch(GitRepositoryAction());
    }, [isFocused]);

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity activeOpacity={0.9} style={styles.Button} onPress={() => navigation.navigate('Bottom')}>
                <Text style={styles.Text}>Get Started</Text>
                <FontAwesome5 name="arrow-right" size={19} color="#fff" style={{ alignSelf: "center", }} />
            </TouchableOpacity>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    mainContainer: { flex: 1, justifyContent: 'center', alignContent: 'center' },
    Button: { backgroundColor: 'blue', alignSelf: 'center', justifyContent: 'center', width: '80%', borderRadius: 50, flexDirection: 'row' },
    Text: { padding: '3%', textAlign: 'center', width: 140, fontSize: 19, color: '#fff', }
})