import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from './styles.ts';
import { Text, View } from '../components/Themed';
import {GradientButton} from '../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../constants/Colors';
import storage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Ionicons, MaterialIcons, FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {CalendarDay, Calendar, CalendarLegend, DosingLegend} from './GenerateScreens/CalendarCreation';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';

export default function Stats({ navigation: { navigate } }) {
  return (
    <View></View>
  );
}
