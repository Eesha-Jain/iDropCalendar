import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native';
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
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Second({ navigation: { navigate } }) {
  const [message, setMessage] = useState("");
  const [drop1, setDrop1] = useState(["", false, false, false, "Both Eyes", 'none']);
  const [drop2, setDrop2] = useState(["", false, false, false, "Both Eyes", 'none']);
  const [drop3, setDrop3] = useState(["", false, false, false, "Both Eyes", 'none']);
  const [drop4, setDrop4] = useState(["", false, false, false, "Both Eyes", 'none']);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const makeRequest = async () => {
      const generateValueDataUnparsed = await storage.getItem('generatevalues');
      const generateValueData = JSON.parse(generateValueDataUnparsed);
      const num = Number(generateValueData["numberOfDrops"]);

      if (num >= 1) { updateDrop(1, 5, 'flex'); }
      if (num >= 2) { updateDrop(2, 5, 'flex'); }
      if (num >= 3) { updateDrop(3, 5, 'flex'); }
      if (num >= 4) { updateDrop(4, 5, 'flex'); }
    }

    const pushFunction = async () => {
      const token = await storage.getItem('expopushtoken');
      setExpoPushToken(token);

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});
    }

    makeRequest();
    pushFunction();
  }, []);

  let indexes = [1, 2, 3, 4];
  const times = ["morning", "afternoon", "night"];

  function getValue(drop, index) {
    if (drop == 1) { return drop1[index]; }
    else if (drop == 2) { return drop2[index]; }
    else if (drop == 3) { return drop3[index]; }
    else { return drop4[index]; }
  }

  function updateDrop(drop, valIndex, value) {
    let arr = [];
    if (drop == 1) {
      arr = [drop1[0], drop1[1], drop1[2], drop1[3], drop1[4], drop1[5]];
      arr[valIndex] = value;
      setDrop1(arr);
    } else if (drop == 2) {
      arr = [drop2[0], drop2[1], drop2[2], drop2[3], drop2[4], drop2[5]];
      arr[valIndex] = value;
      setDrop2(arr);
    } else if (drop == 3) {
      arr = [drop3[0], drop3[1], drop3[2], drop3[3], drop3[4], drop3[5]];
      arr[valIndex] = value;
      setDrop3(arr);
    } else {
      arr = [drop4[0], drop4[1], drop4[2], drop4[3], drop4[4], drop4[5]];
      arr[valIndex] = value;
      setDrop4(arr);
    }
  }

  async function schedulePushNotifications(appointment) {
    Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Good Morning ☕",
        body: "Don't forget to take your morning eyedrops!",
        sound: 'default'
      },
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true
      },
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Good Afternoon 🌞",
        body: "Don't forget to take your afternoon eyedrops!",
        sound: 'default',
      },
      trigger: {
        hour: 12,
        minute: 0,
        repeats: true
      },
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Good Night 🌙",
        body: "Don't forget to take your night eyedrops!",
        sound: 'default',
      },
      trigger: {
        hour: 20,
        minute: 21,
        repeats: true
      },
    });

    try {
      let trigger = new Date(appointment);
      trigger.setHours(7);
      trigger.setMinutes(0);
      trigger.setSeconds(0);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Appointment - Today 👨‍⚕️",
          body: "Your eyecare appointment is today. Don't forget to show this app to your doctor",
          sound: 'default',
        },
        trigger
      });

      trigger.setDate(trigger.getDate() - 7);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Appointment - One Week 👨‍⚕️",
          body: "Your eyecare appointment is in one week. Don't forget to show this app to your doctor",
          sound: 'default',
        },
        trigger
      });
    } catch(e) {}
  }

  async function navigateTabs() {
    const generateValueDataUnparsed = await storage.getItem('generatevalues');
    const generateValueData = JSON.parse(generateValueDataUnparsed);
    const num = Number(generateValueData["numberOfDrops"]);
    const drops = {};
    const token = await storage.getItem('expopushtoken');
    const dosage = await storage.getItem('dosage');
    const parsed = JSON.parse(dosage);
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    if (num >= 1) {
      if (drop1[0] == "") {setMessage("Please set a name for drop 1"); return;}
      drops["drop1"] = { name: drop1[0], morning: drop1[1], afternoon: drop1[2], night: drop1[3], eyes: drop1[4]} }
    if (num >= 2) {
      if (drop2[0] == "") {setMessage("Please set a name for drop 2"); return;}
      drops["drop2"] = { name: drop2[0], morning: drop2[1], afternoon: drop2[2], night: drop2[3], eyes: drop2[4]} }
    if (num >= 3) {
      if (drop3[0] == "") {setMessage("Please set a name for drop 3"); return;}
      drops["drop3"] = { name: drop3[0], morning: drop3[1], afternoon: drop3[2], night: drop3[3], eyes: drop3[4]} }
    if (num >= 4) {
      if (drop4[0] == "") {setMessage("Please set a name for drop 4"); return;}
      drops["drop4"] = { name: drop4[0], morning: drop4[1], afternoon: drop4[2], night: drop4[3], eyes: drop4[4]} }

    setMessage("");
    generateValueData["drops"] = drops;

    if (!(year in parsed)) { parsed[year] = {};}
    if (!(month in parsed[year])) { parsed[year][month] = {};}
    if (day in parsed[year][month]) {delete parsed[year][month][day];};
    parsed[year][month][day] = {};

    if (token != "") {
      schedulePushNotifications(generateValueData["nextAppointment"]);
    }

    await storage.setItem('dosage', JSON.stringify(parsed));
    await storage.setItem('generatevalues', JSON.stringify(generateValueData));
    await storage.setItem('generatestep', "3");
    await storage.setItem('generatedACalendar', 'true');
    navigate("Third");
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Generating iDrop Calendar</Text>
        <View style={{backgroundColor: 'transparent', marginTop: 10, flexDirection: 'row'}}>
          <Image source={require('../../assets/images/2.png')} style={generateStyles.topImage} />
        </View>
      </View>

      <ScrollView>
        <View style={generateStyles.inputBox}>
          {indexes.map((index, id) => {
            var i = id + 1;
            if (getValue(i, 5) == 'flex') {
              return (
                <View key={i}>
                  <Text style={[generateStyles.question, {marginTop: 10}]}>Drop {i}</Text>
                  <TextInput style={generateStyles.input} placeholder="Name" onChangeText={(val) => { updateDrop(i, 0, val); }} value={getValue(i, 0)} multiline={false} />
                  <View style={{marginBottom: 10, paddingBottom: 10}}>
                    {times.map((timeValue, j) => {
                      return (
                        <CheckBox key={j} style={{marginLeft: 15}} isChecked={getValue(i, j + 1)} onClick={() => { updateDrop(i, j + 1, !getValue(i, j + 1)); }} checkBoxColor={Colors.regular["blue"]} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop {i}" in the {timeValue}</Text>} />
                      );
                    })}
                  </View>
                  <Text style={{fontFamily: 'os-light', color: 'rgb(51, 51, 51)', marginBottom: 0, paddingBottom: 0, fontSize: 16}}>Which eye(s) do you put "drop {i}"?</Text>

                  <Picker style={{marginTop: 0, paddingTop: 0}} selectedValue={getValue(i, 4)} onValueChange={(itemValue, itemIndex) => {
                     updateDrop(i, 4, itemValue);
                  }} itemStyle={{fontSize: 16, padding: 0, margin: 10, height: 100, fontFamily: 'os-light'}} >
                    <Picker.Item label="Both" value="Both Eyes"/>
                    <Picker.Item label="Left" value="Left Eye" />
                    <Picker.Item label="Right" value="Right Eye" />
                  </Picker>

                  <View style={{ borderBottomColor: Colors.regular["lightgray"], borderBottomWidth: 1, marginTop: 5, marginBottom: 5}}/>
                </View>
              );
            } else { return ( <View key={i}></View> ); }
          })}

          <TouchableHighlight style={[generateStyles.button, {marginTop: 10}]} onPress={() => navigateTabs()}>
            <GradientButton style={generateStyles.buttonText} text="Click here to Submit" radius="5" />
          </TouchableHighlight>

          <Text style={{fontSize: 20, color: 'red', marginTop: 10, textAlign: 'center'}}>{message}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
