import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import styles from '../styles.ts';
import generateStyles from './GenerateStyles.ts';
import { Text, View } from '../../components/Themed';
import {GradientButton} from '../../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../../constants/Colors';
import storage from "@react-native-async-storage/async-storage";
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';

export default function Second({ navigation: { navigate } }) {
  const [message, setMessage] = useState("");
  const [drop1, setDrop1] = useState(["", false, false, false, "", 'none']);
  const [drop2, setDrop2] = useState(["", false, false, false, "", 'none']);
  const [drop3, setDrop3] = useState(["", false, false, false, "", 'none']);
  const [drop4, setDrop4] = useState(["", false, false, false, "", 'none']);

  useEffect(() => {
    const makeRequest = async () => {
      const generateValueDataUnparsed = await storage.getItem('generatevalues');
      const generateValueData = JSON.parse(generateValueDataUnparsed);
      const num = Number(generateValueData["numberOfDrops"]);

      if (num >= 1) { updateDrop(1, 5, 'block'); }
      if (num >= 2) { updateDrop(2, 5, 'block'); }
      if (num >= 3) { updateDrop(3, 5, 'block'); }
      if (num >= 4) { updateDrop(4, 5, 'block'); }
    }
    makeRequest();
  });

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

  async function navigateTabs() {
    navigation.navigate("Third");
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
          {indexes.map((index, i) => {
            return (
              <View key={i} style={{display: getValue(i, 5)}}>
                <Text style={generateStyles.question}>Drop {i}</Text>
                <TextInput style={generateStyles.input} placeholder="Name" onChangeText={(val) => { updateDrop(i, 0, val); }} value={getValue(i, 0)} multiline={false} />
                <View style={{alignItems: 'left', marginBottom: 10, paddingBottom: 10}}>
                  {times.map((timeValue, j) => {
                    return (
                      <View key={j}>
                        <CheckBox style={{marginLeft: 15}} disabled={false} value={getValue(i, j + 1)} tintColors={Colors.regular["blue"]}
                          tintColor={Colors.regular["blue"]}
                          onFillColor={Colors.regular["blue"]}
                          onValueChange={(newValue) => { updateDrop(i, j + 1, newValue);}}
                        />

                        <Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop {i}" in the {timeValue}</Text>
                      </View>
                    );
                  })}
                </View>
                <Text style={{fontFamily: 'os-light', color: 'rgb(51, 51, 51)', marginBottom: 0, paddingBottom: 0}}>Which eye(s) do you put "drop {i}"?</Text>
                <Picker style={{marginTop: 0, paddingTop: 0}} selectedValue={getValue(i, 4)} onValueChange={(itemValue, itemIndex) => {
                   updateDrop(i, 1, itemValue);
                }} itemStyle={{fontFamily: 'os-light', fontSize: 16, padding: 0, margin: 10, height: 100}} >
                  <Picker.Item label="Both" value="Both Eyes" />
                  <Picker.Item label="Left" value="Left Eye" />
                  <Picker.Item label="Right" value="Right Eye" />
                </Picker>
              </View>
            );
          })}

          <TouchableHighlight style={generateStyles.button} onPress={() => navigateTabs()}>
            <GradientButton style={generateStyles.buttonText} text="Click here to Submit" radius="5" />
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}
