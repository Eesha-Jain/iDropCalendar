import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const MiniStack = createStackNavigator();
import storage from "@react-native-async-storage/async-storage";

import First from './GenerateScreens/First';
import Second from './GenerateScreens/Second';
import Third from './GenerateScreens/Third';

export default function TabOneScreen({ navigation: { navigate } }) {
  const [route, setRoute] = useState("First");

  const makeRequest = async () => {
    const step = await storage.getItem("generatestep");
    if (step == 3) {
      setRoute("Third");
    } else if (step == 2) {
      setRoute("Second");
    }
  }
  makeRequest();

  return (
    <MiniStack.Navigator initialRouteName={route}>
      <MiniStack.Screen
        name="First"
        options={{headerShown:false}}
        component={First}
      />
      <MiniStack.Screen
        name="Second"
        options={{headerShown:false}}
        component={Second}
      />
      <MiniStack.Screen
        name="Third"
        options={{headerShown:false}}
        component={Third}
      />
    </MiniStack.Navigator>
  );
}
