import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import MyStack from './SRC/Screens/Navigations/MyStack';
import NetInfo from "@react-native-community/netinfo";
import configureStore from './Redux/Store/Store';

const store = configureStore();

const App = () => {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setIsConnected(netInfoState.isConnected);
    };
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    checkInternetConnection();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          {isConnected == false ?
            <View style={{ width: '100%', alignContent: 'center', alignSelf: 'center', backgroundColor: 'red' }}>
              <Text style={{ fontSize: 18, textAlign: 'center' }}>No Internet Connection</Text>
            </View> : null}
          <MyStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App