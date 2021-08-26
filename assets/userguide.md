# User Guide

## Local Storage

### Keys

| Key | Value | Type |
| :------------- | :----------: | -----------: |
| firsttime | first time opening the app | Boolean |
| expopushtoken | sending push notifications token | String |
| generatedACalendar | created a calendar before | Boolean |
| generatestep | which step in generate tab | Integer |
| generatevalues | data filled in generate tab | see below |
| dosage | dosage of previous + current days, months, and years | see below |
| badges | whether users have received badges or not | Integer [] |

### Dictionaries
**Generate values** is stored as the following:
{
  numberOfDrops: Integer,
  nextAppointment: String,
  drops: {
    drop1: {
      name: String,
      morning: Boolean,
      afternoon: Boolean,
      night: Boolean,
      eyes: String
    },
    ...
  }
}

**Dosage** is stored as the following:
{
  ...
  2021: { // year
    1: { //month
      1: {
        status: String (completed / notcompleted / na),
        full: String [] [] (e, f, n)
      }
      ...
    }
    ...
  }
  ...
}

Maybe later:
numberOfDrops: Integer,
information: {
  drop1: {
    name: String
    eyes: String
  }
},
calendar: {
  drop1: Integer [_M_, _A_, _N_] (0 = n/a, 1 = supposed, but not took, 2=took)
},

### Import Statements
import storage from "@react-native-async-storage/async-storage";

### Functions
await storage.setItem(KEY, newValue);
await storage.getItem(KEY);
