import { Appearance } from 'react-native';
import colors from '../constants/Colors';

export default function colorfunction(colorName: keyof typeof colors.light & keyof typeof colors.dark) {
  const theme = Appearance.getColorScheme();
  return colors[theme][colorName];
}
