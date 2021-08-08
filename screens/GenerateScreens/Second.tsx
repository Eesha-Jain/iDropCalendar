import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, Picker, ScrollView } from 'react-native';
import styles from '../styles.ts';
import generateStyles from './GenerateStyles.ts';
import { Text, View } from '../../components/Themed';
import {GradientButton} from '../../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../../constants/Colors';
import storage from "@react-native-async-storage/async-storage";
import CheckBox from 'react-native-check-box'

export default function Second({ navigation: { navigate } }) {
  const [message, setMessage] = useState("");
  const [drop1, setDrop1] = useState(["", false, false, false, "", 'none']); //index 5 is the visibility
  const [drop2, setDrop2] = useState(["", false, false, false, "", 'none']);
  const [drop3, setDrop3] = useState(["", false, false, false, "", 'none']);
  const [drop4, setDrop4] = useState(["", false, false, false, "", 'none']);

  const drop1Name = (val) => { setDrop1([val, drop1[1], drop1[2], drop1[3], drop1[4], drop1[5]]); };
  const drop2Name = (val) => { setDrop1([val, drop2[1], drop2[2], drop2[3], drop2[4], drop2[5]]); };
  const drop3Name = (val) => { setDrop1([val, drop3[1], drop3[2], drop3[3], drop3[4], drop3[5]]); };
  const drop4Name = (val) => { setDrop1([val, drop4[1], drop4[2], drop4[3], drop4[4], drop4[5]]); };

  const makeRequest = async () => {
    const generateValueDataUnparsed = await storage.getItem('generatevalues');
    const generateValueData = JSON.parse(generateValueDataUnparsed);
    const num = Number(generateValueData["numberOfDrops"]);

    if (num >= 1) { setDrop1([drop1[0], drop1[1], drop1[2], drop1[3], drop1[4], 'block']); }
    if (num >= 2) { setDrop2([drop2[0], drop2[1], drop1[2], drop2[3], drop2[4], 'block']); }
    if (num >= 3) { setDrop3([drop3[0], drop3[1], drop3[2], drop3[3], drop3[4], 'block']); }
    if (num >= 4) { setDrop4([drop4[0], drop4[1], drop4[2], drop4[3], drop4[4], 'block']); }
  }
  makeRequest();

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

          <View style={{display: drop1[5]}}>
            <Text style={generateStyles.question}>Drop 1</Text>
            <TextInput style={generateStyles.input} placeholder="Name" onChangeText={drop1Name} value={drop1[0]} multiline={false} />
            <View style={{alignItems: 'left', marginBottom: 10, paddingBottom: 10}}>
              <CheckBox style={{marginLeft: 15}} isChecked={drop1[1]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop1([drop1[0], !drop1[1], drop1[2], drop1[3], drop1[4], drop1[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 1" in the morning</Text>} />
              <CheckBox style={{marginLeft: 15}} isChecked={drop1[2]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop1([drop1[0], drop1[1], !drop1[2], drop1[3], drop1[4], drop1[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 1" in the afternoon</Text>} />
              <CheckBox style={{marginLeft: 15}} isChecked={drop1[3]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop1([drop1[0], drop1[1], drop1[2], !drop1[3], drop1[4], drop1[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 1" in the night</Text>} />
            </View>
            <Text style={{fontFamily: 'os-light', color: 'rgb(51, 51, 51)', marginBottom: 0, paddingBottom: 0}}>Which eye(s) do you put "drop 1"?</Text>
            <Picker style={{marginTop: 0, paddingTop: 0}} selectedValue={drop1[4]} onValueChange={(itemValue, itemIndex) => {
               setDrop1([drop1[0], drop1[1], drop1[2], drop1[3], itemValue, drop1[5]]);
            }} itemStyle={{fontFamily: 'os-light', fontSize: 16, padding: 0, margin: 10, height: 100}} >
              <Picker.Item label="Both" value="Both Eyes" />
              <Picker.Item label="Left" value="Left Eye" />
              <Picker.Item label="Right" value="Right Eye" />
            </Picker>
          </View>

          <View style={{display: drop2[5]}}>
            <Text style={generateStyles.question}>Drop 2</Text>
            <TextInput style={generateStyles.input} placeholder="Name" onChangeText={drop2Name} value={drop2[0]} multiline={false} />
            <View style={{alignItems: 'left', marginBottom: 10, paddingBottom: 10}}>
              <CheckBox style={{marginLeft: 15}} isChecked={drop2[1]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop2([drop2[0], !drop2[1], drop2[2], drop2[3], drop2[4], drop2[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 2" in the morning</Text>} />
              <CheckBox style={{marginLeft: 15}} isChecked={drop2[2]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop2([drop2[0], drop2[1], !drop2[2], drop2[3], drop2[4], drop2[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 2" in the afternoon</Text>} />
              <CheckBox style={{marginLeft: 15}} isChecked={drop2[3]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop2([drop2[0], drop2[1], drop2[2], !drop2[3], drop2[4], drop2[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 2" in the night</Text>} />
            </View>
            <Text style={{fontFamily: 'os-light', color: 'rgb(51, 51, 51)', marginBottom: 0, paddingBottom: 0}}>Which eye(s) do you put "drop 2"?</Text>
            <Picker style={{marginTop: 0, paddingTop: 0}} selectedValue={drop2[4]} onValueChange={(itemValue, itemIndex) => {
               setDrop2([drop2[0], drop2[1], drop2[2], drop2[3], itemValue, drop2[5]]);
            }} itemStyle={{fontFamily: 'os-light', fontSize: 16, padding: 0, margin: 10, height: 100}} >
              <Picker.Item label="Both" value="Both Eyes" />
              <Picker.Item label="Left" value="Left Eye" />
              <Picker.Item label="Right" value="Right Eye" />
            </Picker>
          </View>

          <View style={{display: drop3[5]}}>
            <Text style={generateStyles.question}>Drop 3</Text>
            <TextInput style={generateStyles.input} placeholder="Name" onChangeText={drop3Name} value={drop3[0]} multiline={false} />
            <View style={{alignItems: 'left', marginBottom: 10, paddingBottom: 10}}>
              <CheckBox style={{marginLeft: 15}} isChecked={drop3[1]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop3([drop3[0], !drop3[1], drop3[2], drop3[3], drop3[4], drop3[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 3" in the morning</Text>} />
              <CheckBox style={{marginLeft: 15}} isChecked={drop3[2]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop3([drop3[0], drop3[1], !drop3[2], drop3[3], drop3[4], drop3[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 3" in the afternoon</Text>} />
              <CheckBox style={{marginLeft: 15}} isChecked={drop3[3]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop3([drop3[0], drop3[1], drop3[2], !drop3[3], drop3[4], drop3[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 3" in the night</Text>} />
            </View>
            <Text style={{fontFamily: 'os-light', color: 'rgb(51, 51, 51)', marginBottom: 0, paddingBottom: 0}}>Which eye(s) do you put "drop 3"?</Text>
            <Picker style={{marginTop: 0, paddingTop: 0}} selectedValue={drop3[4]} onValueChange={(itemValue, itemIndex) => {
               setDrop3([drop3[0], drop3[1], drop3[2], drop3[3], itemValue, drop3[5]]);
            }} itemStyle={{fontFamily: 'os-light', fontSize: 16, padding: 0, margin: 10, height: 100}} >
              <Picker.Item label="Both" value="Both Eyes" />
              <Picker.Item label="Left" value="Left Eye" />
              <Picker.Item label="Right" value="Right Eye" />
            </Picker>
          </View>

          <View style={{display: drop4[5]}}>
            <Text style={generateStyles.question}>Drop 4</Text>
            <TextInput style={generateStyles.input} placeholder="Name" onChangeText={drop4Name} value={drop4[0]} multiline={false} />
            <View style={{alignItems: 'left', marginBottom: 10, paddingBottom: 10}}>
              <CheckBox style={{marginLeft: 15}} isChecked={drop4[1]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop4([drop4[0], !drop4[1], drop4[2], drop4[3], drop4[4], drop4[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 4" in the morning</Text>} />
              <CheckBox style={{marginLeft: 15}} isChecked={drop4[2]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop4([drop4[0], drop4[1], !drop4[2], drop4[3], drop4[4], drop4[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 4" in the afternoon</Text>} />
              <CheckBox style={{marginLeft: 15}} isChecked={drop4[3]} checkBoxColor={Colors.regular["blue"]} onClick={() => { setDrop4([drop4[0], drop4[1], drop4[2], !drop3[3], drop4[4], drop4[5]]); }} rightTextView={<Text style={{marginLeft: 5, fontFamily: 'os-light', fontSize: 16}}>I take "drop 4" in the night</Text>} />
            </View>
            <Text style={{fontFamily: 'os-light', color: 'rgb(51, 51, 51)', marginBottom: 0, paddingBottom: 0}}>Which eye(s) do you put "drop 4"?</Text>
            <Picker style={{marginTop: 0, paddingTop: 0}} selectedValue={drop4[4]} onValueChange={(itemValue, itemIndex) => {
               setDrop4([drop4[0], drop4[1], drop4[2], drop4[3], itemValue, drop4[5]]);
            }} itemStyle={{fontFamily: 'os-light', fontSize: 16, padding: 0, margin: 10, height: 100}} >
              <Picker.Item label="Both" value="Both Eyes" />
              <Picker.Item label="Left" value="Left Eye" />
              <Picker.Item label="Right" value="Right Eye" />
            </Picker>
          </View>

          <TouchableHighlight style={generateStyles.button} onPress={() => navigateTabs()}>
            <GradientButton style={generateStyles.buttonText} text="Click here to Submit" radius="5" />
          </TouchableHighlight>

          <Text style={{color: 'red', fontSize: 18}}>{message}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
