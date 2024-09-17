import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import Index from './index';
import MasterTabLayout from './(tabs)/(master)/_layout';
import ClientTabLayout from './(tabs)/(client)/_layout';
import MasterHistory from './(pages)/(history)/(master)/history';
import ClientHistory from './(pages)/(history)/(client)/history';
import MasterRegister from './(pages)/(auth)/(master)/register';
import ClientRegister from './(pages)/(auth)/(client)/register';
import Master from './(pages)/(master)/master';
import Login from './(pages)/(auth)/(login)/login';
import CheckCode from './(pages)/(auth)/(check-code)/check-code';
import AddStadium from './(pages)/(master)/(stadium)/(addStadium)/AddStadium';
import editStadium from './(pages)/(master)/(stadium)/(editStaidium)/editStadium';

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
          <Stack.Screen
            name="(pages)/(history)/(master)/history"
            component={MasterHistory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(history)/(client)/history"
            component={ClientHistory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(auth)/(master)/register"
            component={MasterRegister}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(master)/(stadium)/(addStadium)/AddStadium"
            component={AddStadium}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(master)/(stadium)/(editStadium)/editStadium"
            component={editStadium}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(auth)/(client)/register"
            component={ClientRegister}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(auth)/(login)/login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(auth)/(check-code)/check-code"
            component={CheckCode}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </QueryClientProvider>
  );
}