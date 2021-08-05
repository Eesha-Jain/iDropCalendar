import * as React from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
const win = Dimensions.get('window');
import Colors from '../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  top: {
    width: win.width,
    backgroundColor: Colors.regular["lightgray"],
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 10
  },
  topText: {
    marginTop: 10,
    fontFamily: 'os-semibold',
    fontSize: 20,
    color: Colors.regular["darkgray"],
    textAlign: 'center'
  },
  topImage: {
    width: win.width * 0.9,
    height: win.width * 0.9 * (320 / 1600)
  }
});
