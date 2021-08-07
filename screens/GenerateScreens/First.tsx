import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import styles from '../styles.ts';
import generateStyles from './GenerateStyles.ts';
import { Text, View } from '../../components/Themed';
import {GradientButton} from '../../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../../constants/Colors';
import storage from "@react-native-async-storage/async-storage";

export default function First({ navigation }) {
  const [drops, setDrops] = useState(0);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const today = new Date();
  const todayString = (today.getMonth() + 1) + "-" + (today.getDay() + 1) + "-" + today.getFullYear();

  function dropRegulate() {
    if (value >= 1 && value <= 4) {
      return true;
    } else {
      return false;
    }
  }

  async function navigateTabs() {
    if (drops < 1 || drops >= 4) {
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

      await storage.setItem('generatevalues', JSON.stringify(dropDict));
      navigation.navigate("Second");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Generating iDrop Calendar</Text>
        <View style={{backgroundColor: 'transparent', marginTop: 10, flexDirection: 'row'}}>
          <Image source={require('../../assets/images/1.png')} style={generateStyles.topImage} />
        </View>
      </View>

      <View style={generateStyles.inputBox}>
        <Text style={generateStyles.question}>Number of Different Drops</Text>
        <TextInput style={generateStyles.input} placeholder="Number" onChangeText={setDrops} multiline={false} keyboardType="number-pad" maxLength={1} />

        <Text style={generateStyles.question}>Next Appointment Date</Text>
        <DatePicker style={[generateStyles.input, {width: win.width - 20}]} date={date} mode="date" placeholder="mm/dd/yyyy" format="MM-DD-YYYY" minDate={todayString} confirmBtnText="Confirm" cancelBtnText="Cancel" customStyles={{
            dateIcon: {
              display: 'none'
            },
            dateInput: {
              borderWidth: 0,
              borderRadius: 10,
              height: 40,
              padding: 10,
              fontFamily: 'os-light',
              marginBottom: 20,
            },
          }} onDateChange={(date) => { setDate(date); }} />

          <TouchableHighlight style={generateStyles.button} onPress={() => navigateTabs()}>
            <GradientButton style={generateStyles.buttonText} text="Click here to Continue" radius="5" />
          </TouchableHighlight>
      </View>

      <Text style={{color: 'red', fontSize: 18}}>{message}</Text>
    </View>
  );
}
