import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Index from './index';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Master from './(pages)/(master)/master';
import MasterTabLayout from './(tabs)/(master)/_layout';
import ClientTabLayout from './(tabs)/(client)/_layout';
import { QueryClient, QueryClientProvider } from 'react-query';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const Stack = createNativeStackNavigator();

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="index" screenOptions={{ animation: 'none' }}>
          <Stack.Screen
            name="index"
            component={Index}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)/(master)"
            component={MasterTabLayout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)/(client)"
            component={ClientTabLayout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(master)/master"
            component={Master}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </QueryClientProvider>
  );
}