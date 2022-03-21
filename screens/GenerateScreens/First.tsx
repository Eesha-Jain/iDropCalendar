/**
Author: Eesha Jain
In behalf of Nanodropper Inc.
**/

import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles from '../styles.ts';
import generateStyles from './GenerateStyles.ts';
import { Text, View } from '../../components/Themed';
import {GradientButton} from '../../assets/Gradients';
import DateTimePicker from '@react-native-community/datetimepicker';
const win = Dimensions.get('window');
import Colors from '../../constants/ColorFunction';
import storage from "@react-native-async-storage/async-storage";

export default function First({ navigation: { navigate } }) {
  const [drops, setDrops] = useState(0);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(Platform.OS === 'ios');
  const [oppoShow, setOppoShow] = useState('flex');
  var d = new Date();
  d.setDate(d.getDate() + 1);
  const [date, setDate] = useState(d);

  //Functions for when inputs are set on page
  useEffect(() => {
    const makeRequest = async () => {
      if (Platform.OS === 'ios') { setOppoShow('none'); }
    }
    makeRequest();
  }, []);

  const onChange = (event, paraDate) => {
    const currentDate = paraDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
  };

  const makeRequest = async () => {
    const step = await storage.getItem('generatestep');
    if (step == '2') {
      navigate("Second");
    } else if (step == '3') {
      navigate("Third");
    }
  }
  makeRequest();

  function dropRegulate() {
    if (value >= 1 && value <= 4) {
      return true;
    } else {
      return false;
    }
  }

  //Update information in async storage and navigate tabs
  async function navigateTabs() {
    if (drops < 1 || drops > 4) {
      setMessage("Set number of drops between 1 and 4");
    } else if (date == "") {
      setMessage("Please input an appointment date");
    } else {
      var dropDict = {};
      for (var i = 1; i <= drops; i++) {
        dropDict["drop" + i] = {
          name: "",
          morning: false,
          afternoon: false,
          night: false,
          eyes: "Both"
        }
      }

      var dict = {
        numberOfDrops: drops,
        nextAppointment: date,
        drops: dropDict
      };

      setMessage("");
      await storage.setItem('generatestep', "2");
      await storage.setItem('generatevalues', JSON.stringify(dict));
      navigate("Second");
    }
  }

  //"First" page app code
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Generating iDrop Calendar</Text>
        <View style={{backgroundColor: 'transparent', marginTop: 10, flexDirection: 'row'}}>
          <Image source={require('../../assets/images/1.png')} style={generateStyles.topImage} />
        </View>
      </View>

      <View style={generateStyles.inputBox}>
        <Text style={generateStyles.question}>Number of different drops</Text>
        <TextInput style={generateStyles.input} placeholder="Number" onChangeText={setDrops} multiline={false} keyboardType="number-pad" maxLength={1} />

        <Text style={generateStyles.question}>Next appointment date</Text>
        <TouchableOpacity style={[generateStyles.button, {position: 'relative', display: oppoShow}]} onPress={showMode}>
          <Text style={[generateStyles.input, {width: win.width - 20, color: Colors("blue")}]}>{date.toString()}</Text>
        </TouchableOpacity>

        {show && (
            <DateTimePicker
              style={[generateStyles.input, {width: win.width - 20}]}
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="calendar"
              onChange={onChange}
              placeholder="mm/dd/yyyy"
              minimumDate={d}
            />
        )}

        <TouchableOpacity style={generateStyles.button} onPress={() => navigateTabs()}>
          <GradientButton style={generateStyles.buttonText} text="Click here to continue" radius="5" />
        </TouchableOpacity>
      </View>

      <Text style={{color: 'red', fontSize: 18}}>{message}</Text>
    </View>
  );
}
