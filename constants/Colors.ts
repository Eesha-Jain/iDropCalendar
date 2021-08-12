const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  regular: {
    teal: 'rgb(0, 148, 162)',
    blue: '#2A3B9F',
    white: '#FFF',
    lightgray: 'rgb(242, 242, 242)',
    mediumgray: 'rgb(153, 153, 153)',
    darkgray: 'rgb(179, 179, 179)',
    inputgray: 'rgb(77, 77, 77)',
    gradient: 'linear-gradient(to right, rgb(0, 148, 162), #2A3B9F)'
  },
  calendar: {
    notcompleted: 'rgb(248, 164, 148)',
    completed: 'rgb(164, 210, 138)',
    today: 'rgb(251, 244, 156)',
    future: 'rgb(255, 255, 255)',
    noton: 'rgb(204, 204, 204)'
  }
};
