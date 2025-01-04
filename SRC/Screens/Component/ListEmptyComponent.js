import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const ListEmptyComponent = () => {
    const isDarkMode = useSelector((state) => state?.DarkModeReducer?.isDarkMode);
    return (
        <View style={styles.MainContainer}>
            <Text style={{ width: '80%', textAlign: 'center', fontWeight: '700', marginBottom: '10%', color: isDarkMode ? '#fff' : '#000' }}>No Repositories Found</Text>
        </View>
    )
}

export default ListEmptyComponent

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '20%'
    },
})