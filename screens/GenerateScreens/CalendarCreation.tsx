/**
Author: Eesha Jain
In behalf of Nanodropper Inc.
**/

import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from '../styles.ts';
import generateStyles from './GenerateStyles.ts';
import { Text, View } from '../../components/Themed';
import {GradientButton} from '../../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../../constants/ColorFunction';
import storage from "@react-native-async-storage/async-storage";
import CheckBox from 'react-native-check-box';
import {Picker} from '@react-native-picker/picker';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { FontAwesome5, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

//Text indicating the day of the week
function DayOfWeek(props) {
  return (
    <View style={{backgroundColor: 'transparent', alignItems: 'center'}}><Text style={{color: Colors("text")}}>{props.day}</Text></View>
  );
}

//Returns shape respective to drop #
function getDropShape(props) {
  if (props.drop == "drop1") {
    return ( <View style={{width: 20, height: 20, borderWidth: 1, backgroundColor: props.backColor, borderColor: props.color}}></View> );
  } else if (props.drop == "drop2") {
    return ( <View style={{width: 20, height: 20, borderRadius: 20/2, backgroundColor: props.backColor, borderWidth: 1, borderColor: props.color}}></View> );
  } else if (props.drop == "drop3") {
    return ( <View style={{width: 17, height: 17, borderWidth: 1, backgroundColor: props.backColor, borderColor: props.color, marginLeft: 3, transform: [{rotate: "45deg"}]}}></View> );
  } else {
    return ( <FontAwesome style={{color: Colors("drop4")}} name={props.color} size={27} /> );
  }
}

//Daily dosing calendar for patients to fill out as they take their eyedrop medication
function CalendarDay(props) {
  let dic = {};
  const [time, setTime] = useState([]);
  let [full, setFull] = useState([])
  let colors = [Colors("drop1"), Colors("drop2"), Colors("drop3"), 'star-o'];

  let trans = ['transparent', 'transparent', 'transparent', 'star'];
  const [set, setSet] = useState(<View></View>);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  //Schedule push notifications
  async function schedulePushNotifWeek() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Badge Unlocked - Perfect Week 🏆",
        body: "Took all eyedrops for a week!",
        sound: 'default'
      },
      trigger: { seconds: 1 },
    });
  }

  async function schedulePushNotifMonth() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Badge Unlocked - Perfect Month 🏆",
        body: "Took all eyedrops for a month!",
        sound: 'default'
      },
      trigger: { seconds: 1 },
    });
  }

  //Change colored to noncolored shape
  async function onClick(my, mx) {
    var x = mx - 1;
    var y = my - 1;
    var dup = time;

    var unparsed = await storage.getItem('dosage');
    var parsed = JSON.parse(unparsed);

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    parsed["data"] = "have";
    if (!(year in parsed)) { parsed[year] = {}; }
    if (!(month in parsed[year])) { parsed[year][month] = {}; }

    parsed[year][month][day] = {
      status: "notcompleted",
      full: full
    };

    if (full[x][y] == 'e') {
      var arr = [<TouchableOpacity onPress={() => {onClick(my, mx)}}>{getDropShape({drop: "drop" + mx, backColor: colors[x], color: trans[x]})}</TouchableOpacity>];
      dup[my][mx] = arr[0];
      full[x][y] = 'f';

      var completed = true;
      full.forEach(element => {
        for (var i = 0; i < element.length; i++) {
          if (element[i] == 'e') {
            completed = false;
            break;
          }
        }
      });

      if (completed) { parsed[year][month][day]["status"] = "completed"; testPerfect(parsed); }
    } else {
      var arr = [<TouchableOpacity onPress={() => {onClick(my, mx)}}>{getDropShape({drop: "drop" + mx, backColor: trans[x], color: colors[x]})}</TouchableOpacity>];
      dup[my][mx] = arr[0];
      full[x][y] = 'e';

      parsed[year][month][day]["status"] = "notcompleted";
    }

    parsed[year][month][day]["full"] = full;

    setTime(dup);
    await storage.setItem('dosage', JSON.stringify(parsed));
  }

  //See whether user deserve badges
  async function testPerfect(dosageParsed) {
    var badgeUnparsed = await storage.getItem('badges');
    var badge = JSON.parse(badgeUnparsed);
    var earned = [0.3, 0.3];
    var incase = true;

    badge[0] = 0.3;

    if (badge.length >= 1 && badge[0] != 1) {
      for (var i = 0; i < 7; i++) {
        var today = new Date();
        today.setDate(today.getDate() - i);
        try {
          var day = dosageParsed[today.getFullYear()][today.getMonth() + 1][today.getDate()]["status"];
          if (day == "notcompleted") {incase = false; break;}
        } catch (e) {incase = false; break;}
      }
      if (incase) {earned[0] = 1};
    }

    if (badge.length >= 2 && badge[1] != 1 && incase) {
      for (var i = 7; i < 30; i++) {
        var today = new Date();
        today.setDate(today.getDate() - i);
        try {
          var day = dosageParsed[today.getFullYear()][today.getMonth() + 1][today.getDate()]["status"];
          if (day == "notcompleted") {incase = false; break;}
        } catch (e) {incase = false; break;}
      }
      if (incase) {earned[1] = 1};
    }

    if (earned[0] == 1) { if (badge.length < 1 || (badge.length >= 1 && badge[0] != 1)) {schedulePushNotifWeek();} }
    if (earned[1] == 1) { if (badge.length < 2 || (badge.length >= 2 && badge[1] != 1)) {schedulePushNotifMonth();} }

    for (var i = 0; i < earned.length; i++) { if (badge.length > i && badge[i] > earned[i]) { earned[i] = badge[i]; } }
    await storage.setItem('badges', JSON.stringify(earned));
  }

  //Set up the daily calendar log based on async storage
  useEffect(() => {
    const pushFunction = async () => {
      const token = await storage.getItem('expopushtoken');
      setExpoPushToken(token);

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});
    }

    const makeRequest = async () => {
      const obj = await storage.getItem('generatevalues');
      dic = await JSON.parse(obj);
      var unparsed = await storage.getItem('dosage');
      var parsed = await JSON.parse(unparsed);
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      var exists = false;

      if (dic == null || parsed == null) {return;}

      try {
        var a = parsed[year][month][day];
        if (a.hasOwnProperty("full")) { exists = true; }
        else { exists = false; }
      } catch(e) {exists = false;}

      var times = [[<View style={{borderWidth: 1, borderColor: 'gray', backgroundColor: 'transparent', borderRadius: 50, width: 25, height: 25}}><Text style={{textAlign: 'center', fontSize: 18, color: Colors("text")}}>{day}</Text></View>], [<FontAwesome5 name="coffee" size={15} color={Colors("coffeeicons")} style={{margin: 5}} />],[<Ionicons name="sunny" size={15} color={Colors("coffeeicons")} style={{margin: 5}} />], [<MaterialIcons name="nightlight-round" size={15} color={Colors("coffeeicons")} style={{margin: 5}} />]];

      for (var j = 1; j <= dic.numberOfDrops; j++) {
          times[1].push(<View></View>);
          times[2].push(<View></View>);
          times[3].push(<View></View>);
          times[0][j + 1] = <Text style={{fontSize: 18, color: Colors("text")}}>{j}</Text>;
      }

      var arrNums = [];
      for (var i = 1; i <= dic.numberOfDrops; i++) {arrNums.push(i);}
      full = [];

      arrNums.forEach(i => {
        var key = "drop" + i;
        var aa = [];
        try {
          if (exists) {
            aa = parsed[year][month][day]["full"][i - 1];
          } else {
            aa = ["n", "n", "n"];
          }
          var testingtoseeifworks = aa[i];
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

      setTime(times);
      setSet(<Table style={{width: '100%'}}><Rows data={time} flexArr={[1, 1, 1, 1]}/></Table>);
    }
    pushFunction();
    makeRequest();
  }, [set]);

  return (
      <View style={[props.style, {backgroundColor: Colors("lightgray"), padding: 10, alignItems: 'center'}]}>
        <Text style={{fontSize: 20, fontFamily: 'os-bold', textAlign: 'center', color: Colors("text")}}>Today</Text>
        {set}
      </View>
  );
}

//Previous daily dosing calendar for patients to fill out as they take their eyedrop medication (non editable)
function PreviousCalendarDay(props) {
  let dic = {};
  const [time, setTime] = useState([]);
  let [full, setFull] = useState([])
  let colors = [Colors("drop1"), Colors("drop2"), Colors("drop3"), 'star-o'];
  let trans = ['transparent', 'transparent', 'transparent', 'star'];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [set, setSet] = useState(<View></View>);

  useEffect(() => {
    const makeRequest = async () => {
      const obj = await storage.getItem('generatevalues');
      dic = JSON.parse(obj);
      var unparsed = await storage.getItem('dosage');
      var parsed = JSON.parse(unparsed);
      var year = props.year;
      var month = props.month + 1;
      var day = props.day;
      var exists = false;

      try {
        var a = parsed[year][month][day];
        if (a.hasOwnProperty("full")) { exists = true; }
        else { exists = false; }
      } catch(e) {exists = false;}

      var times = [[<View style={{borderWidth: 1, borderColor: 'gray', backgroundColor: 'transparent', borderRadius: 50, width: 25, height: 25}}><Text style={{textAlign: 'center', fontSize: 18, color: Colors("text")}}>{props.day}</Text></View>], [<FontAwesome5 name="coffee" size={15} color={Colors("coffeeicons")} style={{margin: 5}} />],[<Ionicons name="sunny" size={15} color={Colors("coffeeicons")} style={{margin: 5}} />], [<MaterialIcons name="nightlight-round" size={15} color={Colors("coffeeicons")} style={{margin: 5}} />]];

      var cougarday = parsed[year][month][day];

      for (var j = 1; j <= cougarday["full"].length; j++) {
          times[1].push(<View></View>);
          times[2].push(<View></View>);
          times[3].push(<View></View>);
          times[0][j + 1] = <Text style={{fontSize: 18, color: Colors("text")}}>{j}</Text>;
      }

      var arrNums = [];
      for (var i = 1; i <= cougarday["full"].length; i++) {arrNums.push(i);}
      full = [];

      arrNums.forEach(i => {
        var key = "drop" + i;
        var aa = [];
        try {
          if (exists) {
            aa = cougarday["full"][i - 1];
          } else {
            aa = ["n", "n", "n"];
          }
          var testingtoseeifworks = aa[i];
        } catch (e) {
          aa = ['n', 'n', 'n'];
        }

        if (aa[0] != 'n') {
          if (!exists || aa[0] == 'e') {
            var x = [<TouchableOpacity>{getDropShape({drop: key, backColor: trans[i - 1], color: colors[i - 1]})}</TouchableOpacity>]; times[1][i] = x[0];
            aa[0] = 'e';
          } else {
              var x = [<TouchableOpacity>{getDropShape({drop: key, backColor: colors[i - 1], color: trans[i - 1]})}</TouchableOpacity>]; times[1][i] = x[0];
          }
        }

        if (aa[1] != 'n') {
          if (!exists || aa[1] == 'e') {
            var x = [<TouchableOpacity>{getDropShape({drop: key, backColor: trans[i - 1], color: colors[i - 1]})}</TouchableOpacity>]; times[2][i] = x[0];
            aa[1] = 'e';
          } else {
              var x = [<TouchableOpacity>{getDropShape({drop: key, backColor: colors[i - 1], color: trans[i - 1]})}</TouchableOpacity>]; times[2][i] = x[0];
          }
        }

        if (aa[2] != 'n') {
          if (!exists || aa[2] == 'e') {
            var x = [<TouchableOpacity>{getDropShape({drop: key, backColor: trans[i - 1], color: colors[i - 1]})}</TouchableOpacity>]; times[3][i] = x[0];
            aa[2] = 'e';
          } else {
              var x = [<TouchableOpacity>{getDropShape({drop: key, backColor: colors[i - 1], color: trans[i - 1]})}</TouchableOpacity>]; times[3][i] = x[0];
          }
        }

        full.push(aa);
      });

      setTime(times);
      setSet(<Table style={{width: '100%'}}><Rows data={time} flexArr={[1, 1, 1, 1]}/></Table>);
    }
    if (!props.empty) {makeRequest()};
  }, [set, props.empty]);

  return (
    <View style={{backgroundColor: 'transparent'}}>
      {(props.empty) &&
        <View style={{backgroundColor: Colors("lightgray"), padding: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontFamily: 'os-bold', color: Colors("text")}}>{`${months[props.month]} ${props.day}, ${props.year}`}</Text>
          <Text style={{color: Colors("text")}}>No drops taken on this day</Text>
        </View>
      }

      {(!props.empty) &&
        <View style={[props.style, {backgroundColor: Colors("lightgray"), padding: 10, alignItems: 'center'}]}>
          <Text style={{fontSize: 20, fontFamily: 'os-bold', color: Colors("text")}}>{`${months[props.month]} ${props.day}, ${props.year}`}</Text>
          {set}
        </View>
      }
    </View>
  );
}


//Legend that tells patients what each shape means
function DosingLegend(props) {
  const [arr, setArr] = useState([]);
  var shapes = {
    drop1: [<View key={0} style={{width: 15, height: 15, borderWidth: 1, backgroundColor: 'transparent', borderColor: Colors("drop1")}}></View>],
    drop2: [<View key={1} style={{width: 15, height: 15, borderRadius: 15/2, backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors("drop2")}}></View>],
    drop3: [<View key={2} style={{width: 14, height: 14, borderWidth: 1, backgroundColor: 'transparent', borderColor: Colors("drop3"), marginLeft: 3, transform: [{rotate: "45deg"}]}}></View>],
    drop4: [<FontAwesome key={3} style={{color: Colors("drop4")}} name={'star-o'} size={18} />]
  }

  useEffect(() => {
    const makeRequest = async () => {
      const unparsed = await storage.getItem('generatevalues');
      const parsed = JSON.parse(unparsed);
      let list = [];

      if (parsed == null) {return;}

      for (var i = 1; i <= parsed.numberOfDrops; i++) {
        let drop = parsed.drops["drop" + i];
        let num = 0;

        if (drop.morning) {num++;}
        if (drop.afternoon) {num++;}
        if (drop.night) {num++;}

        let arr = [<View key={0} style={generateStyles.dosingLegendRepeat}><Text style={{color: Colors("text")}}>{i}</Text></View>, <View style={generateStyles.dosingLegendRepeat} key={1}>{shapes["drop" + i]}</View>, <View style={generateStyles.dosingLegendRepeat} key={2}><Text style={{color: Colors("text")}}>{drop.name}</Text></View>, <View style={generateStyles.dosingLegendRepeat} key={3}><Text style={{color: Colors("text")}}>{num + "x / day"}</Text></View>, <View style={generateStyles.dosingLegendRepeat} key={4}><Text style={{color: Colors("text")}}>{drop.eyes}</Text></View>];
        list.push(arr);
      }

      setArr(list);
    }
    makeRequest();
  }, [arr]);

  return (
    <View style={[props.style, {backgroundColor: Colors("lightgray"), padding: 10}]}>
      <Text style={{fontSize: 15, fontFamily: 'os-bold', marginBottom: 5, color: Colors("text")}}>Dosing legend:</Text>
      <Table borderStyle={{borderWidth: 0.5, borderColor: 'gray'}} style={{width: '100%'}}>
        <Rows data={arr} flexArr={[1, 1, 4, 3, 3]}/>
      </Table>
    </View>
  );
}

//Legend that explains the color coding on monthly calendar
function CalendarLegend(props) {
  var arr = [[<View style={{backgroundColor: Colors("today"), alignItems: 'center', padding: 5}}><Text style={{color: Colors("text")}}>Today</Text></View>, <View style={{backgroundColor: Colors("completed"), alignItems: 'center', padding: 5}}><Text style={{color: Colors("text")}}>Took all your medication</Text></View>], [<View style={{backgroundColor: Colors("notcompleted"), alignItems: 'center', padding: 5}}><Text style={{color: Colors("text")}}>Didn't take all your medication</Text></View>], [ <View style={{backgroundColor: Colors("noton"), alignItems: 'center', padding: 5}}><Text style={{color: Colors("text")}}>Not on app</Text></View>, <View style={{backgroundColor: Colors("future"), alignItems: 'center', padding: 5}}><Text style={{color: Colors("text")}}>Day in the future</Text></View>]];

  return (
    <View style={[props.style, {backgroundColor: Colors("lightgray"), padding: 10}]}>
      <Text style={{fontSize: 15, fontFamily: 'os-bold', marginBottom: 5, color: Colors("text")}}>Calendar legend:</Text>
      <Table borderStyle={{borderWidth: 0}} style={{width: '100%'}}>
        <Rows data={arr} flexArr={[1, 2]}/>
      </Table>
    </View>
  );
}

export {CalendarDay, PreviousCalendarDay, CalendarLegend, DosingLegend, DayOfWeek};
