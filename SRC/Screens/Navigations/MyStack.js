import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Auth/SplashScreen';
import Bottom from './Bottom';
import Detail from '../Main/Detail';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name='Bottom' component={Bottom} />
            <Stack.Screen name='Detail' component={Detail} />
        </Stack.Navigator>
    )
}

export default MyStack

const styles = StyleSheet.create({})