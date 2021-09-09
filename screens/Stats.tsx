import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from './styles.ts';
import { Text, View } from '../components/Themed';
import {GradientButton} from '../assets/Gradients';
import DatePicker from 'react-native-datepicker';
const win = Dimensions.get('window');
import Colors from '../constants/Colors';
import storage from "@react-native-async-storage/async-storage";
import { FontAwesome5, Ionicons, MaterialIcons, FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {CalendarDay, Calendar, CalendarLegend, DosingLegend} from './GenerateScreens/CalendarCreation';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';
import { useIsFocused } from "@react-navigation/native";

export default function TabThreeScreen({ navigation: { navigate } }) {
  const [dataset, setDataSet] = useState([{ data: [0] }]);
  const [message, setMessage] = useState("");
  const [earn, setEarn] = useState([0, 0]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const makeRequest = async () => {
      var dosageUnparsed = await storage.getItem('dosage');
      var dosageParsed = JSON.parse(dosageUnparsed);
      var ans = [];

      var badgeUnparsed = await storage.getItem('badges');
      var badge = JSON.parse(badgeUnparsed);

      while (earn.length > badge.length) {
        console.log("ins");
        badge.push(0.3);
      }
      setEarn(badge);

      await storage.setItem('badges', JSON.stringify(badge));

      for (var i = 0; i < 30; i++) {
        var today = new Date();
        today.setDate(today.getDate() - i);
        try {
          var day = dosageParsed[today.getFullYear()][today.getMonth() + 1][today.getDate()]["full"];
          var total = 0;
          var full = 0;

          day.forEach(arr => {
              arr.forEach(ele => {
                if (ele != 'n') {
                  total++;
                  if (ele == 'f') { full++; }
                }
              })
          });

          ans.push((full / total) * 100);
        } catch (e) { ans.push(0); }
      }
      setDataSet([{ data: ans }]);
    }
    if (isFocused) { makeRequest(); }
  }, [isFocused]);

  const data = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"],
    datasets: dataset,
    legend: ["Days from Today vs Percent of Drops Taken"]
  };

  const chartConfig = {
      backgroundColor: "#ffffff",
      backgroundGradientFrom: "#ffffff",
      backgroundGradientTo: "#ffffff",
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(42, 59, 159, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(42, 59, 159, ${opacity})`,
      style: { borderRadius: 16 },
      propsForDots: { r: "2", strokeWidth: "1", stroke: Colors.regular["blue"] }
    };

  return (
    <View style={styles.container}>
      <View style={[styles.top, {marginBottom: 10}]}>
        <Image source={require('../assets/images/logos/NanodropperLong.jpg')} style={styles.topImage} />
        <Text style={styles.topText}>Statistics & Badges</Text>
      </View>

      <ScrollView persistentScrollbar={true}>
        <Text style={{fontSize: 20, fontFamily: 'os-bold', marginBottom: 5}}>Statistics - past 30 days</Text>
          <LineChart
            data={data}
            width={win.width - 40}
            height={220}
            withVerticalLines={true}
            yAxisInterval={5}
            fromZero={true}
            formatXLabel={(value) => value % 5 == 0 ? value : ''}
            yAxisSuffix={"%"}
            chartConfig={chartConfig}
            withVerticalLabels={true}
            onDataPointClick={({ value, dataset }) =>
              setMessage('% of Drops Taken: ' + Math.round(value) + '%')
            }
          />
          <Text>{message}</Text>
        <Text style={{fontSize: 20, fontFamily: 'os-bold', marginBottom: 20}}>Badges</Text>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/images/badges/perfectWeek.png')} style={[singleStyles.badge, {opacity: earn[0]}]} />
          <Image source={require('../assets/images/badges/perfectMonth.png')} style={[singleStyles.badge, {opacity: earn[1]}]} />
        </View>
      </ScrollView>
    </View>
  );
}

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
  },
  badge: {
    width: 100,
    height: 100,
    marginRight: 10
  }
});
