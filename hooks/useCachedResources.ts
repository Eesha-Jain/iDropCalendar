import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'os-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
          'os-bolditalic': require('../assets/fonts/OpenSans-BoldItalic.ttf'),
          'os-extrabold': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
          'os-extrabolditalic': require('../assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
          'os-italic': require('../assets/fonts/OpenSans-Italic.ttf'),
          'os-light': require('../assets/fonts/OpenSans-Light.ttf'),
          'os-lightitalic': require('../assets/fonts/OpenSans-LightItalic.ttf'),
          'os-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
          'os-semibold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
          'os-semibolditalic': require('../assets/fonts/OpenSans-SemiBoldItalic.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
