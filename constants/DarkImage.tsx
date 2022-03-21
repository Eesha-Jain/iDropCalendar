/**
Author: Eesha Jain
In behalf of Nanodropper Inc.
**/

import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Image, Appearance } from 'react-native';
import { Text, View } from '../components/Themed';
import styles from '../screens/styles.ts';

export default function DarkImage({title}) {
  const theme = Appearance.getColorScheme();

  return (
    <View style={[styles.top, {marginBottom: 10}]}>
      <Image source={theme != "light" ? require('../assets/images/logos/NanodropperLong.jpg') : require('../assets/images/logos/NanodropperLongDark.png')} style={styles.topImage} />
      <Text style={styles.topText}>{title}</Text>
    </View>
  );
}
