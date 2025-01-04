import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';

const BackHandler = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.9} onPress={navigation} style={{ flexDirection: 'row' }}>
                <Feather name="arrow-left" size={25} color="#fff" style={{}} />
            </TouchableOpacity>
        </View>
    )
}

export default BackHandler
