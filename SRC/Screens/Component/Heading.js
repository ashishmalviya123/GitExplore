import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { color } from './BaseColour';

const Heading = ({ Title, onPress }) => {
    return (
        <View style={styles.MainContainer}>
            <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
                <Feather name="arrow-left" size={25} color="#fff" style={{}} />
            </TouchableOpacity>
            <View>
                <Text style={styles.Text}>{Title}</Text>
            </View>
            <Text />
        </View>
    )
}

export default Heading

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: color.base, padding: 12, borderBottomLeftRadius: 18, borderBottomRightRadius: 18,
        flexDirection: 'row', justifyContent: 'space-between'
    },
    Text: { color: '#fff', fontSize: 16, fontWeight: '800' },
})