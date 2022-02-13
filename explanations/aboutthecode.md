# About the Code
Technologies Used:
* React Native – Expo
* Typescript

General Explanation for the functionalities available in this program:

NAVIGATION
* Using @react-navigation/stack to create a Bottom Navigation
* Create another stack to navigate between screens such as in the Generate tab

LOG
* Get inputs from users to generate a daily log viewable from the "Log" tab
* A table is created for the day with pressable TouchableOpacity buttons
* Logs are stored and accessed using @react-native-async-storage/async-storage
* Stores a "completed" or "noncompleted" status to help with viewing previous logs & badges

VIEW PREVIOUS LOGS
* Accesses status from async storage and indicates this on a colored calendar generated using a for loop
* Clicking on a day on the calendar will pull up the specific dosage from that day by accessing async storage (local storage)

TRACK PROGRESS
* Charts are generated using the react-native-chart-kit library
* Accessing local storage full arrays for each day can determine the % of medication completed
* Each data point is calculated like this individually and used to form the graph

GAIN BADGES
* If button clicked on Log tab completes the array, then qualifications for badges are met
* If badge has not already been given and iterating through the past 7 or 30 days qualifies the user for a badge, then a push notification will be sent, and the badge will appear as received
* Badge status is stored in async storage

PUSH NOTIFICATIONS
* Push notifications are enabled using the expo-notifications library
* Push notifications are customized to user preference (determined by input)
* Push notifications send scheduled reminders for morning, afternoon, and night drops
