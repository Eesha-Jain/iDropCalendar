import * as React from 'react';
import {useState, useEffect} from 'react';
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

export default function TabTwoScreen({ navigation: { navigate } }) {
  const [display, setDisplay] = useState('none');
  const [otherDisplay, setOtherDisplay] = useState('flex');
  const [appointment, setAppointment] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [cal, setCal] = useState([]);

  const day = new Date().getDay();

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
      const appoint = parsed.nextAppointment.split("T");

      setAppointment(appoint[0]);
      setCal([<Calendar key={0} style={{width: '88%'}} month={month} year={year} />]);
    }
    makeRequest();
  }, [cal, month, year]);

  function forward() {
    var amonth = month + 1;
    var ayear = year;
    if (amonth > 11) {
      amonth = 0;
      ayear = ayear + 1;
    }
    setMonth(amonth);
    setYear(ayear);
    setCal([<Calendar key={0} style={{width: '88%'}} month={month} year={year} />]);
  }

  function backward() {
    var amonth = month - 1;
    var ayear = year;
    if (amonth < 0) {
      amonth = 11;
      ayear = ayear - 1;
    }
    setMonth(amonth);
    setYear(ayear);
    setCal([<Calendar key={0} style={{width: '88%'}} month={month} year={year} />]);
  }

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
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity onPress={() => backward()} style={{width: '5%', marginRight: '1%', justifyContent: 'center'}}><AntDesign name="caretleft" size={20} color={Colors.regular["darkgray"]} /></TouchableOpacity>
            {cal[0]}
            <TouchableOpacity onPress={() => forward()} style={{width: '5%', marginLeft: '0%', justifyContent: 'center'}}><AntDesign name="caretright" size={20} color={Colors.regular["darkgray"]} /></TouchableOpacity>
          </View>
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
