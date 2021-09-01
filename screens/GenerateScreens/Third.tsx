import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from '../styles.ts';
import generateStyles from './GenerateStyles';
import { Text, View } from '../../components/Themed';
import {GradientButton} from '../../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../../constants/Colors';
import storage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Ionicons, MaterialIcons, FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {CalendarDay, Calendar, CalendarLegend, DosingLegend, PreviousCalendarDay, DayOfWeek} from './CalendarCreation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default function Third({ navigation: { navigate } }) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [dayDif, setDayDif] = useState(new Date().getDate());
  const [monthDif, setMonthDif] = useState(new Date().getDate());
  const [yearDif, setYearDif] = useState(new Date().getDate());
  const [calendar, setCalendar] = useState([]);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [dosing, setDosing] = useState(true);

  useEffect(() => {
    const calendarMakeRequest = async () => {
      const obj = await storage.getItem('generatevalues');
      let dic = JSON.parse(obj);
      const obj2 = await storage.getItem('dosage');
      let dic2 = JSON.parse(obj2);

      var today = new Date();
      var finalCalendar = "";
      var todayDay = today.getDate();
      var todayMonth = today.getMonth();
      var todayYear = today.getFullYear();

      var arr = [[<DayOfWeek day="SUN" />, <DayOfWeek day="MON" />, <DayOfWeek day="TUE" />, <DayOfWeek day="WED" />, <DayOfWeek day="THU" />, <DayOfWeek day="FRI" />, <DayOfWeek day="SAT" />]];
      let day = 1;

      var dayMonth = new Date(year, month + 1, 0).getDate();
      var dayOfTheWeek = new Date(year, month, 1).getDay();

      for (var i = 0; i < 5; i++) {
        var currentTable = [];
        for (var j = 0; j < 7; j++) {
          if (dayOfTheWeek == 0 && day <= dayMonth) {
            var color = Colors.calendar["noton"];
            if (todayDay == day && todayMonth == month && todayYear == year) {
              color = Colors.calendar["today"];
            } else if (day > todayDay && month == todayMonth && year == todayYear) {
              color = Colors.calendar["future"];
            } else if (month > todayMonth || year > todayYear) {
              color = Colors.calendar["future"];
            } else {
              try {
                var x = dic2[year][month + 1][day];
                if (x.hasOwnProperty("status")) { color = Colors.calendar[x.status]; }
                else { color = Colors.calendar["noton"];}
              } catch(e) { color = Colors.calendar["noton"];}
            }

            let newDay = day;
            let newMonth = month;
            let newYear = year;
            currentTable.push(<TouchableOpacity onPress={() => {lookAtDate(newDay, newMonth, newYear)}} style={{backgroundColor: color, alignItems: 'center'}}><Text>{day}</Text></TouchableOpacity>);
            day++;
          } else { currentTable.push(<View></View>); dayOfTheWeek--; }
        }

        while (currentTable.length != 7) {
          currentTable.push(<View style={{backgroundColor: 'transparent', alignItems: 'center'}}><Text></Text></View>);
        }
        arr.push(currentTable);
      }

      if (dayMonth - day >= 0) {
        var currentTable = [];
        for (var j = 0; j < 7; j++) {
          if (dayOfTheWeek == 0 && day <= dayMonth) {
            var color = Colors.calendar["noton"];
            if (todayDay == day && todayMonth == month && todayYear == year) {
              color = Colors.calendar["today"];
            } else if (day > todayDay && month == todayMonth && year == todayYear) {
              color = Colors.calendar["future"];
            } else if (month > todayMonth || year > todayYear) {
              color = Colors.calendar["future"];
            } else {
              try {
                var x = dic2[year][month + 1][day];
                if (x.hasOwnProperty("status")) { color = Colors.calendar[x.status]; }
                else { color = Colors.calendar["noton"];}
              } catch(e) { color = Colors.calendar["noton"];}
            }

            let newDay = day;
            let newMonth = month;
            let newYear = year;
            currentTable.push(<TouchableOpacity onPress={() => {lookAtDate(newDay, newMonth, newYear)}} style={{backgroundColor: color, alignItems: 'center'}}><Text>{day}</Text></TouchableOpacity>);
            day++;
          } else { currentTable.push(<View></View>); dayOfTheWeek--; }
        }

        while (currentTable.length != 7) {
          currentTable.push(<View style={{backgroundColor: 'transparent', alignItems: 'center'}}><Text></Text></View>);
        }

        arr.push(currentTable);
      }

      setCalendar(arr);
    }
    calendarMakeRequest();
  }, [month, year, dayDif, monthDif]);

  async function lookAtDate(dayp, monthp, yearp) {
    const obj2 = await storage.getItem('dosage');
    let dic2 = JSON.parse(obj2);

    try {
      var x = dic2[yearp][monthp + 1][dayp];
      if (x.hasOwnProperty("status")) {
        var today = new Date();
        if (dayp == today.getDate() && monthp == today.getMonth() && yearp == today.getFullYear()) {
          setDosing(true);
        } else {
          setMonthDif(monthp);
          setDayDif(dayp);
          setYearDif(yearp);
          setDosing(false);
        }
      }
    } catch(e) {}
  }

  function forward() {
    var amonth = month + 1;
    var ayear = year;
    if (amonth > 11) {
      amonth = 0;
      ayear = ayear + 1;
    }
    setMonth(amonth);
    setYear(ayear);
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Generating iDrop Calendar</Text>
        <View style={{backgroundColor: 'transparent', marginTop: 10, flexDirection: 'row'}}>
          <Image source={require('../../assets/images/3.png')} style={generateStyles.topImage} />
        </View>
      </View>

      <ScrollView style={{padding: 10}} persistentScrollbar={true}>
        <TouchableOpacity style={[generateStyles.button, {marginTop: 5, marginBottom: 5}]} onPress={() => {navigate("Calendar")}}>
          <GradientButton style={[generateStyles.buttonText, {padding: 7}]} text="Click here to Fill Out Digitally" radius="5" />
        </TouchableOpacity>

        <TouchableOpacity style={[generateStyles.button, {marginTop: 5, marginBottom: 5}]} onPress={() => {Linking.openURL('https://www.nanodropper.com/calendar/')}}>
          <Text style={[generateStyles.buttonText, {backgroundColor: Colors.regular["blue"], padding: 5, marginLeft: 0, marginRight: 0, paddingRight: 0, width: '100%'}]}>Click here to Download Calendar on Website</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[generateStyles.button, {marginTop: 5, marginBottom: 20}]} onPress={async () => {
          await storage.setItem('generatestep', "1");
          navigate("First");
        }}>
          <Text style={[generateStyles.buttonText, {backgroundColor: Colors.regular["blue"], padding: 5, marginLeft: 0, marginRight: 0, marginTop: 0, paddingRight: 0, width: '100%'}]}>Click here to Generate New Calendar</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', flex: 1}}>
          <TouchableOpacity onPress={() => backward()} style={{width: '5%', marginRight: '1%', justifyContent: 'center'}}><AntDesign name="caretleft" size={20} color={Colors.regular["darkgray"]} /></TouchableOpacity>
          <View style={{backgroundColor: Colors.regular["lightgray"], padding: 10, alignItems: 'center', width: '88%', marginBottom: 10}}>
            <Text style={{fontSize: 20, fontFamily: 'os-bold', marginBottom: 5}}>{months[month]} {year}</Text>
            <Table style={{width: '100%'}}>
              <Rows data={calendar}/>
            </Table>
          </View>
          <TouchableOpacity onPress={() => forward()} style={{width: '5%', marginLeft: '0%', justifyContent: 'center'}}><AntDesign name="caretright" size={20} color={Colors.regular["darkgray"]} /></TouchableOpacity>
        </View>

        {!dosing && <PreviousCalendarDay day={dayDif} month={monthDif} year={yearDif} style={{width: '100%', marginTop: 10, marginBottom: 10}} />}

        <CalendarLegend style={{marginTop: 10, marginBottom: 20, width: '100%'}} />

        <View style={{marginTop: 30}}></View>
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
