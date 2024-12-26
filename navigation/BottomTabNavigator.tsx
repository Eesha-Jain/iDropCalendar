/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';

import Colors from '../constants/ColorFunction';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/GenerateTab';
import TabTwoScreen from '../screens/CalendarTab';
import TabThreeScreen from '../screens/Stats';
import TabFourScreen from '../screens/Questions';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

//Stack Navigation for Bottom Tabs
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Log"
      screenOptions={{
        tabBarActiveTintColor: Colors("tabIconSelected"),
        tabBarInactiveTintColor: Colors("tabIconDefault"),
        tabBarStyle: {
          position: 'absolute' ,
          display: 'flex',
          backgroundColor: Colors("tabBackground"),
          borderWidth: 0
        },
      }}>
      <BottomTab.Screen
        name="Generate"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Log"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-outline" color={color} />,
          headerShown: false
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="stats-chart" color={color} />,
          headerShown: false
        }}
      />
      <BottomTab.Screen
        name="FAQs"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon2 name="questioncircle" color={color} />,
          headerShown: false
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIcon2(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

//Generation tab
function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Gen"
        component={TabOneScreen}
        options={{ headerTitle: 'Generate', headerShown:false }}
      />
    </TabOneStack.Navigator>
  );
}

//Calendar page
const TabTwoStack = createStackNavigator<TabTwoParamList>();
function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Cal"
        component={TabTwoScreen}
        options={{ headerTitle: 'Calendar', headerShown:false }}
      />
    </TabTwoStack.Navigator>
  );
}

//Statistics page
const TabThreeStack = createStackNavigator<TabThreeParamList>();
function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Stat"
        component={TabThreeScreen}
        options={{ headerTitle: 'Stats', headerShown:false }}
      />
    </TabThreeStack.Navigator>
  );
}

//FAQ page
const TabFourStack = createStackNavigator<TabFourParamList>();
function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="Question"
        component={TabFourScreen}
        options={{ headerTitle: 'FQAs', headerShown:false }}
      />
    </TabFourStack.Navigator>
  );
}
