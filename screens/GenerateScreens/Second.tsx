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
import Checkbox from 'expo-checkbox';

export default function Second({ navigation }) {
  const [message, setMessage] = useState("");
  const [drop1, setDrop1] = useState(["", false, false, false, "", 1]); //index 5 is the visibility
  const [drop2, setDrop2] = useState(["", false, false, false, "", 0]);
  const [drop3, setDrop3] = useState(["", false, false, false, "", 0]);
  const [drop4, setDrop4] = useState(["", false, false, false, "", 0]);
  const [isChecked, setChecked] = useState(false);

  const drop1Name = (val) => { setDrop1([val, drop1[1], drop1[2], drop1[3], drop1[4], drop1[5]]); };
  const drop1Morning = (val) => { setDrop1([drop1[0], val, drop1[2], drop1[3], drop1[4], drop1[5]]); };
  const drop1Afternoon = (val) => { setDrop1([drop1[0], drop1[1], val, drop1[3], drop1[4], drop1[5]]); };
  const drop1Night = (val) => { setDrop1([drop1[0], drop1[1], drop1[2], val, drop1[4], drop1[5]]); };
  const drop1Eyes = (val) => { setDrop1([drop1[0], drop1[1], drop1[2], drop1[3], val, drop1[5]]); };

  const makeRequest = async () => {
    const generateValueDataUnparsed = await storage.getItem('generatevalues');
    const generateValueData = JSON.parse(generateValueDataUnparsed);

    if (generateValueData["numberOfDrops"] == 4) {
      setDrop1(["", false, false, false, "", 1]);
      setDrop2(["", false, false, false, "", 1]);
      setDrop3(["", false, false, false, "", 1]);
      setDrop4(["", false, false, false, "", 1]);
    } else if (generateValueData["numberOfDrops"] == 3) {
      setDrop1(["", false, false, false, "", 1]);
      setDrop2(["", false, false, false, "", 1]);
      setDrop3(["", false, false, false, "", 1]);
    } if (generateValueData["numberOfDrops"] == 2) {
      setDrop1(["", false, false, false, "", 1]);
      setDrop2(["", false, false, false, "", 1]);
    } if (generateValueData["numberOfDrops"] == 1) {
      setDrop1(["", false, false, false, "", 1]);
    }
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

      <View style={generateStyles.inputBox}>
        <Text style={generateStyles.question}>Drop 1</Text>
        <TextInput style={[generateStyles.input, {opacity: drop1[5]}]} placeholder="Name" onChangeText={drop1Name} value={drop1[0]} multiline={false} />

        <View style={customStyles.checkboxContainer}>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
          <Text style={customStyles.label}>Do you like React Native?</Text>
        </View>

        <TextInput style={[generateStyles.input, {opacity: drop1[5]}]} placeholder='Which eye(s) do you put "drop 1"?' onChangeText={drop1Eyes} value={drop1[4]} multiline={false} />

        <TouchableHighlight style={generateStyles.button} onPress={() => navigateTabs()}>
          <GradientButton style={generateStyles.buttonText} text="Click here to Submit" radius="5" />
        </TouchableHighlight>
      </View>

      <Text style={{color: 'red', fontSize: 18}}>{message}</Text>
    </View>
  );
}

/*
<View style={[customStyles.checkboxContainer, {opacity: drop1[5]}]}>
  <CheckBox value={drop1[1]} onValueChange={drop1Morning} style={customStyles.checkbox} />
  <Text style={customStyles.label}>I take "drop 1" in the morning</Text>
</View>

<View style={[customStyles.checkboxContainer, {opacity: drop1[5]}]}>
  <CheckBox value={drop1[2]} onValueChange={drop1Afternoon} style={customStyles.checkbox} />
  <Text style={customStyles.label}>I take "drop 1" in the afternoon</Text>
</View>

<View style={[customStyles.checkboxContainer, {opacity: drop1[5]}]}>
  <CheckBox value={drop1[3]} onValueChange={drop1Night} style={customStyles.checkbox} />
  <Text style={customStyles.label}>I take "drop 1" in the night</Text>
</View>*/

const customStyles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    fontFamily: 'os-light'
  },
  checkbox: {
    alignSelf: "center",
    fontFamily: 'os-light',
  },
  label: {
    margin: 8,
  },
});
