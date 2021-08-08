import * as React from 'react';
import { StyleSheet, Image, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import styles from './styles.ts';
import { Text, View } from '../components/Themed';
import { Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {GradientText, GradientButton} from '../assets/Gradients';
const win = Dimensions.get('window');
import storage from "@react-native-async-storage/async-storage";
import {useState} from 'react';

export default function TabTwoScreen({ navigation: { navigate } }) {
  const [opacity, setOpacity] = useState(0);

  async function navigateTabs() {
    navigation.navigate("Generate")
  }

  const makeRequest = async () => {
    const obj = await storage.getItem('generatedACalendar');
    if (obj == "false") {
      setOpacity(1);
    }
  }
  makeRequest();

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={require('../assets/images/logos/NanodropperLong.jpg')} style={styles.topImage} />
        <Text style={styles.topText}>iDrop Calendar</Text>
      </View>

      <View style={singleStyles.none}>
        <Entypo name="emoji-sad" size={150} color={Colors.regular["mediumgray"]} />
        <Text style={{color: Colors.regular["mediumgray"], fontSize: 20, margin: 20}}>You haven't created any polls yet</Text>

        <TouchableHighlight style={singleStyles.button} onPress={() => navigateTabs()}>
          <GradientButton style={singleStyles.buttonText} text="Click here to Generate Calendar" radius="5" />
        </TouchableHighlight>
      </View>
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
