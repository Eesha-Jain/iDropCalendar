import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const win = Dimensions.get('window');
import Colors from '../constants/Colors';
import {GradientText, GradientButton} from '../assets/Gradients';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/NanodropperCircle.png')} style={styles.topImage} />
      <GradientText text="Small Drops, Big Vision" style={styles.titleText} />
      <GradientText text="Need a remEYEnder?" style={styles.smallText} />
      <GradientText text="Begin using iDrop Calendar!" style={styles.smallText} />
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
    fontSize: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  smallText: {
    backgroundColor: 'transparent',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  }
});
