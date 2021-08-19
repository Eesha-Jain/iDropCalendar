import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, ScrollView, Linking } from 'react-native';
import styles from '../styles.ts';
import generateStyles from './GenerateStyles.ts';
import { Text, View } from '../../components/Themed';
import {GradientButton} from '../../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../../constants/Colors';
import storage from "@react-native-async-storage/async-storage";
import CheckBox from 'react-native-check-box';
import {Picker} from '@react-native-picker/picker';
import {CalendarDay, Calendar, CalendarLegend} from './CalendarCreation';

export default function Third({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Generating iDrop Calendar</Text>
        <View style={{backgroundColor: 'transparent', marginTop: 10, flexDirection: 'row'}}>
          <Image source={require('../../assets/images/3.png')} style={generateStyles.topImage} />
        </View>
      </View>

      <ScrollView style={{padding: 10}}>
        <TouchableHighlight style={[generateStyles.button, {marginTop: 5, marginBottom: 5}]} onPress={() => {navigate("Calendar")}}>
          <GradientButton style={[generateStyles.buttonText, {padding: 7}]} text="Click here to Fill Out Digitally" radius="5" />
        </TouchableHighlight>

        <TouchableHighlight style={[generateStyles.button, {marginTop: 5, marginBottom: 5}]} onPress={() => {Linking.openURL('https://www.nanodropper.com/calendar/')}}>
          <Text style={[generateStyles.buttonText, {backgroundColor: Colors.regular["blue"], padding: 5, marginLeft: 0, marginRight: 0, paddingRight: 0, width: '100%'}]}>Click here to Download Calendar on Website</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[generateStyles.button, {marginTop: 5, marginBottom: 20}]} onPress={async () => {
          await storage.setItem('generatestep', "1");
          navigate("First");
        }}>
          <Text style={[generateStyles.buttonText, {backgroundColor: Colors.regular["blue"], padding: 5, marginLeft: 0, marginRight: 0, marginTop: 0, paddingRight: 0, width: '100%'}]}>Click here to Generate New Calendar</Text>
        </TouchableHighlight>

        <Calendar month={new Date().getMonth()} year={new Date().getFullYear()} />
        <CalendarLegend style={{marginTop: 20}} />

        <View style={{marginTop: 30}}></View>
      </ScrollView>
    </View>
  );
}
