import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import {dic} from '../constants/Colors';

export default function FirstScreen() {
  return (
    <View style={styles.container}>
      <Text>testing</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: dic["regular"]["gradient"]
  }
});
