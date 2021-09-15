import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from '../styles.ts';
import { Text, View } from '../../components/Themed';
import {GradientButton} from '../../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../../constants/Colors';
import generateStyles from '../GenerateScreens/GenerateStyles';
import storage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Ionicons, MaterialIcons, FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {CalendarDay, CalendarLegend, DosingLegend, PreviousCalendarDay, DayOfWeek} from '../GenerateScreens/CalendarCreation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useIsFocused } from "@react-navigation/native";

export default function Main({ navigation: { navigate } }) {
  const [display, setDisplay] = useState('none');
  const [otherDisplay, setOtherDisplay] = useState('flex');
  const [appointment, setAppointment] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [dosing, setDosing] = useState(true);
  const isFocused = useIsFocused();

  async function navigateTabs() {
    navigate("Generate")
  }

  useEffect(() => {
    const makeRequest = async () => {
      const obj = await storage.getItem('generatedACalendar');
      if (obj == "false") {
        setDisplay('flex');
        setOtherDisplay('none');
      }

      const val = await storage.getItem('generatevalues');
      const parsed = JSON.parse(val);
      var appoint;

      try { appoint = parsed.nextAppointment.split("T"); }
      catch (e) { appoint = ""; }

      setAppointment(appoint[0]);
    }
    if (isFocused) { makeRequest(); }
  }, [month, year, isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={require('../../assets/images/logos/NanodropperLong.jpg')} style={styles.topImage} />
        <Text style={styles.topText}>iDrop Calendar</Text>
      </View>

      <View style={[singleStyles.none, {display: display}]}>
        <Entypo name="emoji-sad" size={150} color={Colors.regular["mediumgray"]} />
        <Text style={{color: Colors.regular["mediumgray"], fontSize: 20, margin: 20}}>You haven't created a calendar yet</Text>

        <TouchableHighlight style={singleStyles.button} onPress={() => navigateTabs()}>
          <GradientButton style={singleStyles.buttonText} text="Click here to Generate Calendar" radius="5" />
        </TouchableHighlight>
      </View>

      <ScrollView persistentScrollbar={true}>
        <View style={{display: otherDisplay, padding: 20, alignItems: 'center', width: win.width}}>
          <Text style={{fontSize: 20, fontFamily: 'os-bold', textAlign: 'center', marginBottom: 10, width: '100%', backgroundColor: '#ADD8E6', padding: 10}}>Next Appointment: {appointment}</Text>

          <DosingLegend style={{width: '100%', marginBottom: 10}} />
          <CalendarDay style={{width: '100%', marginTop: 5, marginBottom: 10}} />

          <TouchableOpacity style={[generateStyles.button, {marginBottom: 10}]} onPress={() => {Linking.openURL('https://www.nanodropper.com/calendar/')}}>
            <Text style={[generateStyles.buttonText, {backgroundColor: Colors.regular["mediumgray"], padding: 5, marginLeft: 0, marginRight: 0, paddingRight: 0, width: '100%'}]}>Click here to download calendar on website</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[generateStyles.button, {marginBottom: 10}]} onPress={() => {navigate("Preview")}}>
            <Text style={[generateStyles.buttonText, {backgroundColor: Colors.regular["mediumgray"], padding: 5, marginLeft: 0, marginRight: 0, paddingRight: 0, width: '100%'}]}>Click here to use an old calendar</Text>
          </TouchableOpacity>

          <View style={{marginBottom: 10, padding: 10, backgroundColor: Colors.regular["lightgray"], width: '100%'}}>
            <Text style={{fontSize: 16, fontFamily: 'os-semibold'}}>Instructions:</Text>
            <Text style={{fontSize: 16}}>- Click on the shapes to mark them taken</Text>
            <Text style={{fontSize: 16}}>- Take <FontAwesome5 name="coffee" size={15} color="#2A3B9F" style={{margin: 5}} /> drops in the morning</Text>
            <Text style={{fontSize: 16}}>- Take <Ionicons name="sunny" size={15} color="#2A3B9F" style={{margin: 5}} /> drops in the afternoon</Text>
            <Text style={{fontSize: 16}}>- Take <MaterialIcons name="nightlight-round" size={15} color="#2A3B9F" style={{margin: 5}} /> drops in the night</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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
