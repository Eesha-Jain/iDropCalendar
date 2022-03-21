/**
Author: Eesha Jain
In behalf of Nanodropper Inc.
**/

import * as React from 'react';
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const win = Dimensions.get('window');
import {GradientText, GradientButton} from '../assets/Gradients';
import storage from "@react-native-async-storage/async-storage";
import Colors from '../constants/ColorFunction';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

export default function FirstScreen ({ navigation: { navigate } }) {
  //Get permission to send push notifications to user
  async function navigateTabs() {
    const registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Enable push notifications to get dosing and appointment reminders!');
          await storage.setItem('expopushtoken', "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem('expopushtoken', token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    };
    registerForPushNotificationsAsync();

    navigate("Tabs");
  }

  //Set default values for async storage keys
  useEffect(() => {
    const makeRequest = async () => {
      await storage.setItem('dateOn', new Date().toString());
      await storage.setItem('firsttime', 'false');
      await storage.setItem('generatedACalendar', 'false');
      await storage.setItem('generatestep', '1');
      await storage.setItem('previousCalendar', JSON.stringify([]));
      await storage.setItem('generateValues', JSON.stringify({data: 'none', numberOfDrops: 0}));
      await storage.setItem('dosage', JSON.stringify({data: 'none', numberOfDrops: 0}));
      await storage.setItem('badges', JSON.stringify([0.3, 0.3]));
    }

    makeRequest();
  }, []);

  //"FirstScreen" page app code
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/NanodropperCircle.png')} style={styles.topImage} />
      <GradientText text="Small Drops, Big Vision" style={styles.titleText} />
      <GradientText text="Need a remEYEnder?" style={styles.smallText} />
      <GradientText text="Begin using iDrop Calendar!" style={styles.smallText} />

      <TouchableOpacity style={styles.button} onPress={() => navigateTabs()}>
        <GradientButton style={styles.buttonText} text="Start Now!" radius="5" />
      </TouchableOpacity>
    </View>
  );
}

//Styles specific to "FirstScreen" page
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors("background"),
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
