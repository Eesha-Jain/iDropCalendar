import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Image } from 'react-native';
import styles from '../styles.ts';
import { Text, View } from '../../components/Themed';

export default function Third({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Generated!</Text>
      </View>
    </View>
  );
}
