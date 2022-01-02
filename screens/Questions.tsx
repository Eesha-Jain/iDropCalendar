import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from './styles.ts';
import { Text, View } from '../components/Themed';
import {GradientButton} from '../assets/Gradients';
import generateStyles from './GenerateScreens/GenerateStyles';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../constants/Colors';
import storage from "@react-native-async-storage/async-storage";

export default function Questions({ navigation: { navigate } }) {
  const questions = [
    `What is the right dose for eyedrops? Will the drop have enough medication?`,
    `Why are smaller eyedrops safer?`,
    `Can it be reused between bottles?`,
    `Can I clean and reuse the Nanodropper adaptor?`,
    `When should I throw away the bottle of eyedrops?`,
    `Is the Nanodropper adaptor recyclable?`,
    `Why is the shipping box so big?`,
    `How is Nanodropper helping with healthcare waste?`,
    `Will it fit on my bottle?`,
    `How is Nanodropper helping with healthcare waste?`
  ];
  const answers = [
    `Multiple studies have shown that 7-10 microliters is the ideal-sized drop size for the average human eye. Typical eyedrop bottles administer upwards of 50 microliters. The Nanodropper adaptor reduces the size of each drop to the ideal 10 microliter range.`,
    `There's a limited space on your eye that can hold extra liquid. The bigger the initial drop, the bigger your eye's response to the foreign sensation. This can lead to what is called "systemic side-effects," where the medication acts like it would if you had taken it by mouth. Because the severity is volume-dependent, the smaller drops have been shown in clinical studies to be safer.`,
    `The Nanodropper adaptor is a sterile medical device and is not intended to be taken off the bottle once installed. We recommend using one adaptor per medication to prevent risk of contamination, infection, and injury.`,
    `The Nanodropper adaptor is a sterile medical device. It should not be reused between bottles. Please use one adaptor per medication bottle and discard at the end of the bottle-life. Do not attempt to clean or reuse any parts of the Nanodropper adaptor as it may lead to contamination, infection, and injury.`,
    `Expiration of medications is a tricky science. Our recommendation is always to have a conversation with your eye doctor and follow their instructions. For general guidance, the American Academy of Ophthalmology recommends that you throw away your bottle of eyedrops 3 months after you open the bottle.`,
    `The cap and base are #2 HDPE plastics. They can be recycled with other clean plastics. #2 plastics currently have the highest rate of recycled plastics and are not one of the "mixed plastics" that end up in landfills.`,
    `As a medical device, our shipping boxes have to be validated to meet FDA guidelines. We're working on shipping Nanodropper adaptor sets of 1-4 quantities in smaller boxes in the future. Check out or local clinic partners to purchase in-person to help our environmental efforts of reducing shipments and boxes!`,
    `The environmental impact of manufacturing medications is both understudied and burdensome. Eyedrops are no exception, and medication waste, packaging and shipping of those medications, and even the number of times that you are visiting the pharmacy to pick up these medications is something Nanodropper is helping to reduce, one drop at a time.`,
    `Each adaptor is $14.99 and should only be used on one bottle. The American Academy of Ophthalmology recommends that bottles are tossed out 3 months after opening, so the Nanodropper could make each bottle of medication last up to 3 months with its smaller drops. Many patients will find that the additional doses per bottle pays for the cost of the Nanodropper quickly.`,
    `If you'd like to double-check the fit, you can find our compatibility card here: https://nanodropper.com/compatibility. Please note our 100% Fit Guarantee: if you order and the Nanodropper doesn’t fit your bottle, we will offer a full refund. If you are still unsure, you can send an image of your bottle in front of the compatibility card and we can confirm.`
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.top, {marginBottom: 10}]}>
        <Image source={require('../assets/images/logos/NanodropperLong.jpg')} style={styles.topImage} />
        <Text style={styles.topText}>Questions</Text>
      </View>

      <ScrollView persistentScrollbar={true}>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 25, fontFamily: 'os-bold', marginBottom: 10, textAlign: 'center'}}>Contact Us</Text>
          <Text style={{fontSize: 18, fontFamily: 'os-light', marginBottom: 10, textAlign: 'center'}}><Text style={{fontFamily: 'os-semibold'}}>Email:</Text> support@nanodropper.com</Text>
          <Text style={{fontSize: 18, fontFamily: 'os-light', marginBottom: 10, textAlign: 'center'}}><Text style={{fontFamily: 'os-semibold'}}>Phone:</Text> (507) 405-5676</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontFamily: 'os-bold', marginBottom: 10, textAlign: 'center'}}>FQA</Text>

          <TouchableOpacity style={[generateStyles.button, {marginBottom: 10, width: '80%'}]} onPress={() => {Linking.openURL('https://drive.google.com/file/d/15Dw18tBDBgg4I7supeI-TH7BjK3C-21T/view?usp=sharing')}}>
            <Text style={[generateStyles.buttonText, {backgroundColor: Colors.regular["mediumgray"], padding: 5, marginLeft: 0, marginRight: 0, paddingRight: 0, width: '100%'}]}>App use instructions</Text>
          </TouchableOpacity>

          {questions.map((val, i) => (
              <View style={{width: '98%', padding: 10, paddingBottom: 0, margin: 0}} key={i}>
                <View style={{ borderBottomColor: Colors.regular["darkgray"], padding: 0, margin: 0, borderBottomWidth: 1, marginTop: 5, marginBottom: 5}}/>
                <View style={{marginTop: 15}}>
                  <Text style={{fontSize: 18, fontFamily: 'os-regular', margin: 0, padding: 0, marginBottom: 10, textAlign: 'left'}}><Text style={{fontFamily: 'os-extrabold'}}>Q:</Text> {val}</Text>
                  <Text style={{fontSize: 18, fontFamily: 'os-light', margin: 0, padding: 0, marginBottom: 10, textAlign: 'left'}}><Text style={{fontFamily: 'os-extrabold'}}>A:</Text> {answers[i]}</Text>
                </View>
              </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
