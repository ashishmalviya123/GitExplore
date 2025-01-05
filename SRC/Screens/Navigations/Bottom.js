import * as React from 'react';
import { Text, View, StyleSheet,  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Main/Home';
import Favourite from '../Main/Favourite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color } from '../Component/BaseColour';

const Tab = createBottomTabNavigator();

const Bottom = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true, tabBarStyle: styles.mainContainer,
            headerShown: false, tabBarInactiveTintColor: '#FFFFFF', tabBarActiveTintColor: '#E1D9D1',
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel: 'Home', tabBarLabelPosition: 'below-icon',
                tabBarActiveTintColor: '#FFFFFF', tabBarInactiveTintColor: '#8D899A',
                tabBarLabel: config =>
                    <Text style={config.focused ? styles.selectedText : styles.unselectedText}>Home</Text>,
                tabBarIcon: config => config.focused ? <Ionicons name="home" size={22} color="#fff" /> : <Ionicons name="home-outline" size={22} color="grey" />
            }} />
            <Tab.Screen name="Favourite" component={Favourite} options={{
                tabBarLabel: 'Favourite', tabBarLabelPosition: 'below-icon',
                tabBarActiveTintColor: '#FFFFFF', tabBarInactiveTintColor: '#8D899A',
                tabBarLabel: config =>
                    <Text style={config.focused ? styles.selectedText : styles.unselectedText}>Favorite</Text>,
                tabBarIcon: config => config.focused ? <AntDesign name="heart" size={25} color="#fff" /> : <AntDesign name="hearto" size={25} color="grey" />,
            }} />
        </Tab.Navigator>
    )
}

export default Bottom

const styles = StyleSheet.create({
    mainContainer: {
        height: '7%', backgroundColor: color.base, elevation: 0, borderTopWidth: 0, width: '100%', alignSelf: 'center'
    },
    selectedText: { color: '#FFFFFF', width: 80, alignSelf: 'center', textAlign: 'center', fontSize: 12, },
    unselectedText: { color: '#8D899A', width: 80, alignSelf: 'center', textAlign: 'center', fontSize: 12, },
    selectedIcon: { alignSelf: "center", top: '1%' },
    ImageTintBottom: { width: 25, height: 25, tintColor: '#fff' },
    ImageBottom: { width: 25, height: 25, tintColor: '#8D899A' }
})