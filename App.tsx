import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import AsyncStorage from "@react-native-async-storage/async-storage";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import FirstScreen from './screens/FirstScreen';
import Navigation from './navigation';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator initialRouteName="FirstScreen">
            <Stack.Screen
              name="FirstScreen"
              options={{headerShown:false}}
              component={FirstScreen}
            />
            <Stack.Screen
              name="Tabs"
              initialParams={{ colorScheme: colorScheme }}
              options={{headerShown:false}}
              component={Navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
