/**
Author: Eesha Jain
In behalf of Nanodropper Inc.
**/

import * as React from 'react';
import {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from '../styles.ts';
import { Text, View } from '../../components/Themed';
import {GradientButton} from '../../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../../constants/ColorFunction';
import generateStyles from '../GenerateScreens/GenerateStyles';
import storage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Ionicons, MaterialIcons, FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {CalendarDay, CalendarLegend, DosingLegend, PreviousCalendarDay, DayOfWeek} from '../GenerateScreens/CalendarCreation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default function Preview({ navigation: { navigate } }) {
  var shapes = {
    drop1: [<View key={0} style={{width: 15, height: 15, borderWidth: 1, backgroundColor: 'transparent', borderColor: Colors("drop1")}}></View>],
    drop2: [<View key={1} style={{width: 15, height: 15, borderRadius: 15/2, backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors("drop2")}}></View>],
    drop3: [<View key={2} style={{width: 14, height: 14, borderWidth: 1, backgroundColor: 'transparent', borderColor: Colors("drop3"), marginLeft: 3, transform: [{rotate: "45deg"}]}}></View>],
    drop4: [<FontAwesome key={3} style={{color: Colors("drop4")}} name={'star-o'} size={18} />]
  }

  var [data, setData] = useState({});

  //Update screen with new list of previously generated calendar
  async function update(index) {
    var cal = await storage.getItem('previousCalendar');
    var parsed = JSON.parse(cal);

    var unparsed = await storage.getItem('generatevalues');
    var valuesParsed = JSON.parse(unparsed);

    valuesParsed["drops"] = parsed[index];
    valuesParsed["numberOfDrops"] = Object.keys(parsed[index]).length;

    var dosage = await storage.getItem('dosage');
    var dosageParse = JSON.parse(dosage);

    try {
       var today = new Date();
       delete dosageParse[today.getFullYear()][today.getMonth() + 1][today.getDate()];
    } catch (e) {}

    await storage.setItem('generatevalues', JSON.stringify(valuesParsed));
    await storage.setItem('dosage', JSON.stringify(dosageParse));

    navigate("Main");
  }

  //Delete previous calendars that are selected to be deleted
  async function delet(index) {
    var cal = await storage.getItem('previousCalendar');

    var parsed = JSON.parse(cal);
    parsed.splice(index, 1);

    var datadup = data;
    datadup.splice(index, 1);
    setData(datadup);

    await storage.setItem('previousCalendar', JSON.stringify(parsed));
    navigate("Main");
  }

  //Access list of previously generated calendar and store in state on screen load
  useEffect(() => {
    const makeRequest = async () => {
      var cal = await storage.getItem('previousCalendar');
      var parsed = JSON.parse(cal);
      var oldCal = [];

      for (var i = 0; i < parsed.length; i++) {
        var arr = [];

        Object.keys(parsed[i]).forEach(function(key) {
          var dic = parsed[i][key];
          arr.push([dic.morning, dic.afternoon, dic.night]);
        })

        oldCal.push({
          key: i + "",
          value: JSON.stringify(arr)
        })
      }

      setData(oldCal);
    }

    if (!("1" in data)) {makeRequest();}
  }, [data]);

  //"Preview" page app code
  return (
    <View style={styles.container}>
      <Text style={{marginTop: 10, color: Colors("blue"), textAlign: "center", fontSize: 16}}>Click to Use A Previously Generated Calendar</Text>

      <View
        style={{
            borderWidth: 1,
            borderColor: Colors("text"),
            width: win.width * 0.8,
            margin: 20
        }}
      />

      <FlatList
        data={data}
        style={{
          marginLeft: 10,
          marginRight: 10
        }}

        renderItem={({item}) => {
          var t = [];
          var it = JSON.parse(item["value"]);

          for (var i = 0; i < it.length; i++) {
            var a = [];
            it[i].forEach((value) => {
              if (value == false) {a.push(<View style={{backgroundColor: 'transparent', padding: 5}}><Text style={{color: 'transparent'}}>_</Text></View>);}
              else {a.push(<View style={{padding: 5, backgroundColor: 'transparent'}}>{shapes["drop" + (i + 1)]}</View>);}
            });
            t.push(a);
          }

          return (
            <View style={{backgroundColor: Colors("lightgray"), marginBottom: 10, padding: 10, width: win.width * 0.9}}>
              <TouchableOpacity key={item["key"]} style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {update(item["key"])}}>
                <Table style={{width: '50%'}}><Cols data={t}/></Table>
              </TouchableOpacity>

              <TouchableOpacity style={{marginTop: 10}} onPress={() => {delet(item["key"])}}>
                <Text style={{color: Colors('red')}}>Delete</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

//Styles specific to "Preview" page
const singleStyles = StyleSheet.create({
  none: {
    marginTop: 40,
    marginBottom: 40,
    flex: 1,
    alignItems: 'center',
    height: win.height
  },
  button: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    margin: 10,
    textAlign: 'center',
    width: win.width * 0.8,
    fontFamily: 'os-light'
  }
});
