import * as React from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
const win = Dimensions.get('window');
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  topImage: {
    width: win.width * 0.8,
    height: win.width * 0.8 * (114 / 829)
  },
  inputBox: {
    padding: 10,
    width: win.width
  },
  question: {
    fontSize: 20,
    color: Colors.regular["inputgray"],
    marginBottom: 10,
    fontFamily: 'os-light'
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.regular["inputgray"],
    backgroundColor: 'transparent',
    borderRadius: 10,
    height: 40,
    padding: 10,
    fontFamily: 'os-light',
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    flexDirection: 'row',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    margin: 5,
    textAlign: 'center',
    width: win.width - 30,
    fontFamily: 'os-light'
  },
  dosingLegendRepeat: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    padding: 3
  }
});
