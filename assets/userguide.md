# User Guide

## Local Storage

### Keys

| Key | Value | Type |
| :------------- | :----------: | -----------: |
| firsttime | first time opening the app | Boolean |
| generatestep | which step in generate tab | Integer |
| generatevalues | data filled in generate tab | see below |
| dosage | dosage of previous + current days, months, and years | see below |

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
  2021: {
    january: {
      1: {
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
      }
      ...
    }
    ...
  }
  ...
}

### Import Statements
import storage from "@react-native-async-storage/async-storage";

### Functions
await storage.setItem(KEY, newValue);
await storage.getItem(KEY);