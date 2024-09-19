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
import Register from './(pages)/(auth)/(register)/register';
import Master from './(pages)/(master)/master';
import Login from './(pages)/(auth)/(login)/login';
import CheckCode from './(pages)/(auth)/(check-code)/check-code';
import AddStadium from './(pages)/(master)/(stadium)/(add-stadium)/add-stadium';
import InternetNotice from '@/components/internet-notice/internet-notice';
import StadiumLoacations from './(pages)/(maps)/(stadium-locations)/stadium-locations';
import EditStadium from './(pages)/(master)/(stadium)/(edit-stadium)/edit-stadium';
import ClientDashboard from './(pages)/(client)/(dashboard)/dashboard';
import OrderSave from './(pages)/(order)/(order-save)/order-save';
import OrderDatails from './(pages)/(order)/(order-datails)/order-datails';
import UserInfo from './(pages)/(auth)/(register)/getInfo';
import Payment from './(pages)/(order)/(payment)/payment';
import OrdersDay from './(tabs)/(client)/ordersDay';
import OrderDetail from './(pages)/(master)/(order)/orderDetail';

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
        <InternetNotice />
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
            name="(pages)/(auth)/(register)/register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(auth)/(register)/getInfo"
            component={UserInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(master)/(stadium)/(add-stadium)/add-stadium"
            component={AddStadium}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(master)/(stadium)/(edit-stadium)/edit-stadium"
            component={EditStadium}
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
          <Stack.Screen
            name="(pages)/(maps)/(stadium-locations)/stadium-locations"
            component={StadiumLoacations}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(client)/(dashboard)/dashboard"
            component={ClientDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(order)/(order-save)/order-save"
            component={OrderSave}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(order)/(order-details)/order-details"
            component={OrderDatails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(order)/(payment)/payment"
            component={Payment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/(master)/(order)/orderDetail"
            component={OrderDetail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </QueryClientProvider>
  );
}