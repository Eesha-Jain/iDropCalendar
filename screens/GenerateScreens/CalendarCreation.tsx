import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, Linking } from 'react-native';
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
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { FontAwesome5, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

function DayOfWeek(props) {
  return (
    <View style={{backgroundColor: 'transparent', alignItems: 'center'}}><Text>{props.day}</Text></View>
  );
}

function DosingLegend(props) {
  const [arr, setArr] = useState([]);
  var shapes = {
    drop1: [<View key={0} style={{width: 15, height: 15, borderWidth: 1, backgroundColor: 'transparent', borderColor: '#293caa'}}></View>],
    drop2: [<View key={1} style={{width: 15, height: 15, borderRadius: 15/2, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#585bc4'}}></View>],
    drop3: [<View key={2} style={{width: 14, height: 14, borderWidth: 1, backgroundColor: 'transparent', borderColor: '#7f7dde', marginLeft: 3, transform: [{rotate: "45deg"}]}}></View>],
    drop4: [<FontAwesome key={3} style={{color: '#5d8abd'}} name={'star-o'} size={18} />]
  }

  useEffect(() => {
    const makeRequest = async () => {
      const unparsed = await storage.getItem('generatevalues');
      const parsed = JSON.parse(unparsed);
      let list = [];

      for (var i = 1; i <= parsed.numberOfDrops; i++) {
        let drop = parsed.drops["drop" + i];
        let num = 0;

        if (drop.morning) {num++;}
        if (drop.afternoon) {num++;}
        if (drop.night) {num++;}

        let arr = [<View key={0} style={generateStyles.dosingLegendRepeat}><Text>{i}</Text></View>, <View style={generateStyles.dosingLegendRepeat} key={1}>{shapes["drop" + i]}</View>, <View style={generateStyles.dosingLegendRepeat} key={2}><Text>{drop.name}</Text></View>, <View style={generateStyles.dosingLegendRepeat} key={3}><Text>{num + "x / day"}</Text></View>, <View style={generateStyles.dosingLegendRepeat} key={4}><Text>{drop.eyes}</Text></View>];
        list.push(arr);
      }

      setArr(list);
    }
    makeRequest();
  }, []);

  return (
    <View style={[props.style, {backgroundColor: Colors.regular["lightgray"], padding: 10}]}>
      <Text style={{fontSize: 15, fontFamily: 'os-bold', marginBottom: 5}}>Dosing Legend:</Text>
      <Table borderStyle={{borderWidth: 0.5, borderColor: 'gray'}} style={{width: '100%'}}>
        <Rows data={arr} flexArr={[1, 1, 2, 2, 2]}/>
      </Table>
    </View>
  );
}

function CalendarLegend(props) {
  return (
    <View style={[props.style, {backgroundColor: Colors.regular["lightgray"], padding: 10}]}>
      <Text style={{fontSize: 15, fontFamily: 'os-bold', marginBottom: 5}}>Calendar Legend:</Text>
      <View style={{backgroundColor: Colors.calendar["today"], alignItems: 'center', padding: 5}}><Text>Today</Text></View>
      <View style={{backgroundColor: Colors.calendar["completed"], alignItems: 'center', padding: 5}}><Text>Took All Your Medication</Text></View>
      <View style={{backgroundColor: Colors.calendar["notcompleted"], alignItems: 'center', padding: 5}}><Text>Didn't Take All Your Medication</Text></View>
      <View style={{backgroundColor: Colors.calendar["noton"], alignItems: 'center', padding: 5}}><Text>Not on App Yet</Text></View>
      <View style={{backgroundColor: Colors.calendar["future"], alignItems: 'center', padding: 5}}><Text>Day in the Future</Text></View>
    </View>
  );
}

function Calendar(props) {
  const [calendar, setCalendar] = useState([]);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const makeRequest = async () => {
      const obj = await storage.getItem('generatevalues');
      let dic = JSON.parse(obj);
      const obj2 = await storage.getItem('dosage');
      let dic2 = JSON.parse(obj2);

      var today = new Date();
      var finalCalendar = "";
      var month = props.month;
      var year = props.year;
      var todayDay = today.getDate();
      var todayMonth = today.getMonth();
      var todayYear = today.getFullYear();

      var arr = [[<DayOfWeek day="SUN" />, <DayOfWeek day="MON" />, <DayOfWeek day="TUE" />, <DayOfWeek day="WED" />, <DayOfWeek day="THU" />, <DayOfWeek day="FRI" />, <DayOfWeek day="SAT" />]];
      var day = 1;

      var dayMonth = new Date(year, month + 1, 0).getDate();
      var dayOfTheWeek = new Date(year, month, 1).getDay();

      for (var i = 0; i < 5; i++) {
        var currentTable = [];
        for (var j = 0; j < 7; j++) {
          if (dayOfTheWeek == 0 && day <= dayMonth) {
            if (todayDay == day && todayMonth == month && todayYear == year) {
              currentTable.push(<View style={{backgroundColor: Colors.calendar["today"], alignItems: 'center'}}><Text>{day}</Text></View>);
            } else if (day > todayDay && month == todayMonth && year == todayYear) {
              currentTable.push(<View style={{backgroundColor: Colors.calendar["future"], alignItems: 'center'}}><Text>{day}</Text></View>);
            } else if (month > todayMonth || year > todayYear) {
              currentTable.push(<View style={{backgroundColor: Colors.calendar["future"], alignItems: 'center'}}><Text>{day}</Text></View>);
            } else {
              try {
                var x = dic2[year][month + 1][day];
                currentTable.push(<View style={{backgroundColor: Colors.calendar[x.status], alignItems: 'center'}}><Text>{day}</Text></View>);
              } catch(e) {
                currentTable.push(<View style={{backgroundColor: Colors.calendar["noton"], alignItems: 'center'}}><Text>{day}</Text></View>);
              }
            }
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
            if (todayDay == day && todayMonth == month && todayYear == year) {
              currentTable.push(<View style={{backgroundColor: Colors.calendar["today"], alignItems: 'center'}}><Text>{day}</Text></View>);
            } else if (day > todayDay && month == todayMonth && year == todayYear) {
              currentTable.push(<View style={{backgroundColor: Colors.calendar["future"], alignItems: 'center'}}><Text>{day}</Text></View>);
            } else if (month > todayMonth || year > todayYear) {
              currentTable.push(<View style={{backgroundColor: Colors.calendar["future"], alignItems: 'center'}}><Text>{day}</Text></View>);
            } else {
              try {
                var x = dic2[year][month + 1][day];
                currentTable.push(<View style={{backgroundColor: Colors.calendar[x.status], alignItems: 'center'}}><Text>{day}</Text></View>);
              } catch(e) {
                currentTable.push(<View style={{backgroundColor: Colors.calendar["noton"], alignItems: 'center'}}><Text>{day}</Text></View>);
              }
            }
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
    makeRequest();
  }, [props.month, props.year]);

  return (
    <View style={[props.style, {backgroundColor: Colors.regular["lightgray"], padding: 10, alignItems: 'center'}]}>
      <Text style={{fontSize: 20, fontFamily: 'os-bold', marginBottom: 5}}>{months[props.month]} {props.year}</Text>
      <Table style={{width: '100%'}}>
        <Rows data={calendar}/>
      </Table>
    </View>
  );
}

function getDropShape(props) {
  if (props.drop == "drop1") {
    return ( <View style={{width: 20, height: 20, borderWidth: 1, backgroundColor: props.backColor, borderColor: props.color}}></View> );
  } else if (props.drop == "drop2") {
    return ( <View style={{width: 20, height: 20, borderRadius: 20/2, backgroundColor: props.backColor, borderWidth: 1, borderColor: props.color}}></View> );
  } else if (props.drop == "drop3") {
    return ( <View style={{width: 17, height: 17, borderWidth: 1, backgroundColor: props.backColor, borderColor: props.color, marginLeft: 3, transform: [{rotate: "45deg"}]}}></View> );
  } else {
    return ( <FontAwesome style={{color: '#5d8abd'}} name={props.color} size={27} /> );
  }
}

function CalendarDay(props) {
  let dic = {};
  const [time, setTime] = useState([]);
  const [full, setFull] = useState([]);
  let colors = ['#293caa', '#585bc4', '#7f7dde', 'star-o'];
  let trans = ['transparent', 'transparent', 'transparent', 'star'];
  const [set, setSet] = useState(<View></View>);

  async function onClick(my, mx) {
    var x = mx - 1;
    var y = my - 1;
    var dup = time;
    var dup2 = full;

    var unparsed = await storage.getItem('dosage');
    var parsed = JSON.parse(unparsed);

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    parsed["data"] = "have";
    if (!(year in parsed)) { parsed[year] = {};}
    if (!(month in parsed[year])) { parsed[year][month] = {};}
    if (!(day in parsed[year][month])) { parsed[year][month][day] = {
      status: "notcompleted",
      full: full
    };}

    if (full[x][y] == 'e') {
      var arr = [<TouchableOpacity onPress={() => {onClick(my, mx)}}>{getDropShape({drop: "drop" + mx, backColor: colors[x], color: trans[x]})}</TouchableOpacity>];
      dup[my][mx] = arr[0];
      dup2[x][y] = 'f';

      var completed = true;
      full.forEach(element => {
        for (var i = 0; i < element.length; i++) {
          if (element[i] == 'e') {
            completed = false;
            break;
          }
        }
      });

      if (completed) { parsed[year][month][day]["status"] = "completed"; }
    } else {
      var arr = [<TouchableOpacity onPress={() => {onClick(my, mx)}}>{getDropShape({drop: "drop" + mx, backColor: trans[x], color: colors[x]})}</TouchableOpacity>];
      dup[my][mx] = arr[0];
      dup2[x][y] = 'e';

      parsed[year][month][day]["status"] = "notcompleted";
    }

    parsed[year][month][day]["full"] = full;

    setTime(dup);
    setFull(dup2);
    setSet(<Rows data={time} flexArr={[1, 1, 1, 1]}/>);
    await storage.setItem('dosage', JSON.stringify(parsed));
  }

  useEffect(() => {
    const makeRequest = async () => {
      const obj = await storage.getItem('generatevalues');
      dic = JSON.parse(obj);
      var unparsed = await storage.getItem('dosage');
      var parsed = JSON.parse(unparsed);
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();

      try {
        var a = parsed[year][month][day];
        if (a.hasOwnProperty("full")) { exists = true; }
        else { exists = false; }
      } catch(e) {exists = false;}

      var times = [[<View style={{borderWidth: 1, borderColor: 'gray', backgroundColor: 'transparent', borderRadius: 50, width: 25, height: 25}}><Text style={{textAlign: 'center', fontSize: 18}}>{props.day}</Text></View>], [<FontAwesome5 name="coffee" size={15} color="#2A3B9F" style={{margin: 5}} />],[<Ionicons name="sunny" size={15} color="#2A3B9F" style={{margin: 5}} />], [<MaterialIcons name="nightlight-round" size={15} color="#2A3B9F" style={{margin: 5}} />]];

      for (var j = 1; j <= dic.numberOfDrops; j++) {
          times[1].push(<View></View>);
          times[2].push(<View></View>);
          times[3].push(<View></View>);
          times[0][j + 1] = <Text style={{fontSize: 18}}>{j}</Text>;
      }

      var arrNums = [];
      for (var i = 1; i <= dic.numberOfDrops; i++) {arrNums.push(i);}

      arrNums.forEach(i => {
        var key = "drop" + i;
        var aa = [];
        try {
          if (exists) {
            aa = parsed[year][month][day]["full"][i - 1];
          } else {
            aa = ["n", "n", "n"];
          }
        } catch (e) {
          aa = ['n', 'n', 'n'];
        }

        if (dic.drops[key]['morning'] == 1) {
          if (!exists || aa[0] == 'e') {
            var x = [<TouchableOpacity onPress={() => {onClick(1, i)}}>{getDropShape({drop: key, backColor: trans[i - 1], color: colors[i - 1]})}</TouchableOpacity>]; times[1][i] = x[0];
            aa[0] = 'e';
          } else {
              var x = [<TouchableOpacity onPress={() => {onClick(1, i)}}>{getDropShape({drop: key, backColor: colors[i - 1], color: trans[i - 1]})}</TouchableOpacity>]; times[1][i] = x[0];
          }
        }

        if (dic.drops[key]['afternoon'] == 1) {
          if (!exists || aa[1] == 'e') {
            var x = [<TouchableOpacity onPress={() => {onClick(2, i)}}>{getDropShape({drop: key, backColor: trans[i - 1], color: colors[i - 1]})}</TouchableOpacity>]; times[2][i] = x[0];
            aa[1] = 'e';
          } else {
              var x = [<TouchableOpacity onPress={() => {onClick(2, i)}}>{getDropShape({drop: key, backColor: colors[i - 1], color: trans[i - 1]})}</TouchableOpacity>]; times[2][i] = x[0];
          }
        }

        if (dic.drops[key]['night'] == 1) {
          if (!exists || aa[2] == 'e') {
            var x = [<TouchableOpacity onPress={() => {onClick(3, i)}}>{getDropShape({drop: key, backColor: trans[i - 1], color: colors[i - 1]})}</TouchableOpacity>]; times[3][i] = x[0];
            aa[2] = 'e';
          } else {
              var x = [<TouchableOpacity onPress={() => {onClick(3, i)}}>{getDropShape({drop: key, backColor: colors[i - 1], color: trans[i - 1]})}</TouchableOpacity>]; times[3][i] = x[0];
          }
        }

        full.push(aa);
      });

      for (var i = 0; i < times.length; i++) {
        time.push(times[i]);
      }

      setSet(<Rows data={time} flexArr={[1, 1, 1, 1]}/>);
    }
    makeRequest();
  }, []);

  return (
    <View style={[props.style, {backgroundColor: Colors.regular["lightgray"], padding: 10, alignItems: 'center'}]}>
      <Table style={{width: '100%'}}>
        {set}
      </Table>
    </View>
  );
}

export {CalendarDay, Calendar, CalendarLegend, DosingLegend};
