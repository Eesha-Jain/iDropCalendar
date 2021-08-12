import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, ScrollView, Linking } from 'react-native';
import styles from './styles.ts';
import { Text, View } from '../components/Themed';
import {GradientButton} from '../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../constants/Colors';
import storage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Ionicons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import {CalendarDay, Calendar, CalendarLegend, DosingLegend} from './GenerateScreens/CalendarCreation';

export default function TabTwoScreen({ navigation: { navigate } }) {
  const [display, setDisplay] = useState('none');
  const [otherDisplay, setOtherDisplay] = useState('block');
  const [appointment, setAppointment] = useState("");

  const day = new Date().getDay();

  async function navigateTabs() {
    navigate("Generate")
  }

  useEffect(() => {
    const makeRequest = async () => {
      const obj = await storage.getItem('generatedACalendar');
      if (obj == "false") {
        setDisplay('block');
        setOtherDisplay('none');
      }

      const val = await storage.getItem('generatevalues');
      const parsed = JSON.parse(val);
      const appoint = parsed.nextAppointment.split("T");

      setAppointment(appoint[0]);
    }
    makeRequest();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={require('../assets/images/logos/NanodropperLong.jpg')} style={styles.topImage} />
        <Text style={styles.topText}>iDrop Calendar</Text>
      </View>

      <View style={[singleStyles.none, {display: display}]}>
        <Entypo name="emoji-sad" size={150} color={Colors.regular["mediumgray"]} />
        <Text style={{color: Colors.regular["mediumgray"], fontSize: 20, margin: 20}}>You haven't created a calendar yet</Text>

        <TouchableHighlight style={singleStyles.button} onPress={() => navigateTabs()}>
          <GradientButton style={singleStyles.buttonText} text="Click here to Generate Calendar" radius="5" />
        </TouchableHighlight>
      </View>

      <ScrollView>
        <View style={{display: otherDisplay, padding: 20, alignItems: 'center', width: win.width}}>
          <Text style={{fontSize: 20, fontFamily: 'os-bold', marginBottom: 20}}>Next Appointment: {appointment}</Text>
          <Calendar style={{width: '100%'}} />
          <CalendarLegend style={{marginTop: 10, marginBottom: 20, width: '100%'}} />

          <Text style={{fontSize: 20, fontFamily: 'os-bold'}}>Today</Text>
          <CalendarDay day={day} style={{width: '100%', marginTop: 10, marginBottom: 10}} />
          <DosingLegend style={{width: '100%', marginBottom: 10}} />
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
