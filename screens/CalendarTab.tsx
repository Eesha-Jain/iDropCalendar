import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Image, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const CalStack = createStackNavigator();
import storage from "@react-native-async-storage/async-storage";

import Main from './Log/Main';
import Preview from './Log/Preview';

export default function TabTwoScreen({ navigation: { navigate } }) {
  return (
    <CalStack.Navigator initialRouteName={"Main"}>
      <CalStack.Screen
        name="Main"
        options={{headerShown:false}}
        component={Main}
      />
      <CalStack.Screen
        name="Preview"
        options={{headerShown:true}}
        component={Preview}
        options={{
          title: "Old Calendars",
        }}
      />
    </CalStack.Navigator>
  );
}
