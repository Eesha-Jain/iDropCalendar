import * as React from 'react';
import { StyleSheet, Dimensions, Image, Text, View  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const win = Dimensions.get('window');
import Colors from '../constants/Colors';

function Lg() {
  return (
    <MaskedView style={{ height: 24 }} maskElement={<Text>hii</Text>} >
      <LinearGradient
        colors={['cadetblue', '#fabada']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0.33 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
}

export default function FirstScreen({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/NanodropperCircle.png')} style={styles.topImage} />

      //Colors.regular["teal"]

      <Text style={styles.titleText}>Small Drops, Big Vision</Text>
      <Text style={styles.smallText}>Need a remEYEnder?</Text>
      <Text style={styles.smallText}>Begin using iDrop Calendar!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  topImage: {
    width: win.width * 0.8,
    height: win.width * 0.8,
    marginTop: 30,
    marginBottom: 20
  },
  titleText: {
    fontFamily: 'os-bold',
    fontSize: 40,
    marginLeft: 10,
    marginRight: 10
  },
  smallText: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10
  }
});
