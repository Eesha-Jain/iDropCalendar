/**
Author: Eesha Jain
In behalf of Nanodropper Inc.
**/

import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Image, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const CalStack = createStackNavigator();
import Colors from '../constants/ColorFunction';
import storage from "@react-native-async-storage/async-storage";

import Main from './Log/Main';
import Preview from './Log/Preview';

export default function TabTwoScreen({ navigation: { navigate } }) {
  //Stack Navigation for CalendarTab (filling out daily calendar)
  return (
    <CalStack.Navigator
      initialRouteName={"Main"}
      screenOptions={{
        headerTintColor: Colors("tabIconSelected"),
        headerStyle: {
          backgroundColor: Colors("tabBackground"),
          borderWidth: 0
        },
      }}
    >
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
