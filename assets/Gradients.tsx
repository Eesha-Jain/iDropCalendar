import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
const win = Dimensions.get('window');
import Colors from '../constants/Colors';

function GradientButton(props) {
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[Colors.regular["teal"], Colors.regular["blue"]]}>
        <Text style={props.style}>{props.text}</Text>
      </LinearGradient>
    </View>
  );
}

function GradientText(props) {
  return (
    <MaskedView maskElement={<Text style={props.style}>{props.text}</Text>}>
      <LinearGradient colors={[Colors.regular["teal"], Colors.regular["blue"]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={[props.style, {opacity: 0}]}>{props.text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

export{GradientText, GradientButton};
