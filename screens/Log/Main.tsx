/**
Author: Eesha Jain
In behalf of Nanodropper Inc.
**/

import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from '../styles.ts';
import { Text, View } from '../../components/Themed';
import {GradientButton} from '../../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../../constants/ColorFunction';
import Header from '../../constants/DarkImage';
import generateStyles from '../GenerateScreens/GenerateStyles';
import storage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Ionicons, MaterialIcons, FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {CalendarDay, CalendarLegend, DosingLegend, PreviousCalendarDay, DayOfWeek} from '../GenerateScreens/CalendarCreation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useIsFocused } from "@react-navigation/native";

export default function Main({ navigation: { navigate } }) {
  const [appointment, setAppointment] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [dosing, setDosing] = useState(true);
  const isFocused = useIsFocused();
  const [display, setDisplay] = useState(false);

  //Navigate to "Generate" page
  async function navigateTabs() {
    navigate("Generate")
  }

  useEffect(() => {
    const makeRequest = async () => {
      //Accesses values from async storage & sets them to state values
      const obj = await storage.getItem('generatedACalendar');
      if (obj == "true" && display == false) {
        setDisplay(true);
      }

      const val = await storage.getItem('generatevalues');
      const parsed = JSON.parse(val);
      var appoint;

      try { appoint = parsed.nextAppointment.split("T"); }
      catch (e) { appoint = ""; }

      setAppointment(appoint[0]);
    }

    if (isFocused) {makeRequest();}
  }, [isFocused, display]);

  //"Main" page app code
  return (
    <View style={styles.container}>
      <Header title="iDrop Calendar" />

      { display ?
        <ScrollView persistentScrollbar={true}>
          <View style={{padding: 20, alignItems: 'center', width: win.width, backgroundColor: Colors("background")}}>
            <Text style={{fontSize: 20, fontFamily: 'os-bold', textAlign: 'center', marginBottom: 10, width: '100%', backgroundColor: Colors("appointment"), padding: 10, color: Colors('text')}}>Next Appointment: {appointment}</Text>

            <DosingLegend style={{width: '100%', marginBottom: 10}} />
            <CalendarDay style={{width: '100%', marginTop: 5, marginBottom: 10}} />

            <TouchableOpacity style={[generateStyles.button, {marginBottom: 10}]} onPress={() => {Linking.openURL('https://www.nanodropper.com/calendar/')}}>
              <Text style={[generateStyles.buttonText, {backgroundColor: Colors("mediumgray"), padding: 5, marginLeft: 0, marginRight: 0, paddingRight: 0, width: '100%'}]}>Click here to download calendar on website</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[generateStyles.button, {marginBottom: 10}]} onPress={() => {navigate("Preview")}}>
              <Text style={[generateStyles.buttonText, {backgroundColor: Colors("mediumgray"), padding: 5, marginLeft: 0, marginRight: 0, paddingRight: 0, width: '100%'}]}>Click here to use an old calendar</Text>
            </TouchableOpacity>

            <View style={{marginBottom: 50, padding: 10, backgroundColor: Colors("lightgray"), width: '100%'}}>
              <Text style={{fontSize: 16, fontFamily: 'os-semibold', color: Colors("text")}}>Instructions:</Text>
              <Text style={{fontSize: 16, color: Colors("text")}}>- Click on the shapes to mark them taken</Text>
              <Text style={{fontSize: 16, color: Colors("text")}}>- Take <FontAwesome5 name="coffee" size={15} color={Colors("coffeeicons")} style={{margin: 5}} /> drops in the morning</Text>
              <Text style={{fontSize: 16, color: Colors("text")}}>- Take <Ionicons name="sunny" size={15} color={Colors("coffeeicons")} style={{margin: 5}} /> drops in the afternoon</Text>
              <Text style={{fontSize: 16, color: Colors("text")}}>- Take <MaterialIcons name="nightlight-round" size={15} color={Colors("coffeeicons")} style={{margin: 5}} /> drops in the night</Text>
            </View>
          </View>
        </ScrollView> : <View style={[singleStyles.none, {backgroundColor: 'transparent'}]}>
          <Entypo name="emoji-sad" size={150} color={Colors("darkgray")} />
          <Text style={{color: Colors("darkgray"), fontSize: 20, margin: 20}}>You haven't created a calendar yet</Text>

          <TouchableOpacity style={singleStyles.button} onPress={() => navigateTabs()}>
            <GradientButton style={singleStyles.buttonText} text="Click here to Generate Calendar" radius="5" />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

//Styles specific to "Main" page
const singleStyles = StyleSheet.create({
  none: {
    marginTop: 40,
    marginBottom: 40,
    flex: 1,
    alignItems: 'center',
    height: win.height
  },
  button: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    margin: 10,
    textAlign: 'center',
    width: win.width * 0.8,
    fontFamily: 'os-light'
  }
});
