import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const win = Dimensions.get('window');
import Colors from '../constants/Colors';
import {GradientText, GradientButton} from '../assets/Gradients';
import storage from "@react-native-async-storage/async-storage";

export default function FirstScreen ({ navigation: { navigate } }) {
  async function navigateTabs() {
    await storage.setItem('firsttime', 'false');
    await storage.setItem('generatedACalendar', 'false');
    await storage.setItem('generatestep', '1');
    await storage.setItem('generateValues', JSON.stringify({data: 'none'}));
    await storage.setItem('dosage', JSON.stringify({data: 'none'}));

    navigate("Tabs");
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/NanodropperCircle.png')} style={styles.topImage} />
      <GradientText text="Small Drops, Big Vision" style={styles.titleText} />
      <GradientText text="Need a remEYEnder?" style={styles.smallText} />
      <GradientText text="Begin using iDrop Calendar!" style={styles.smallText} />

      <TouchableHighlight style={styles.button} onPress={() => navigateTabs()}>
        <GradientButton style={styles.buttonText} text="Start Now!" radius="5" />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: win.height
  },
  topImage: {
    width: win.width * 0.8,
    height: win.width * 0.8,
    marginTop: 30,
    marginBottom: 20
  },
  titleText: {
    backgroundColor: 'transparent',
    fontFamily: 'os-bold',
    fontSize: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  smallText: {
    backgroundColor: 'transparent',
    fontFamily: 'os-light',
    fontSize: 25,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5
  },
  button: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    margin: 20,
    textAlign: 'center',
    width: win.width * 0.7,
    fontFamily: 'os-light'
  }
});
