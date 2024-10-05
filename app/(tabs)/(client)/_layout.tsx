import { colors } from '@/constants/Colors';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ClientDashboard from './dashboard';
import ClientProfile from './profile';
import OrdersDay from './ordersDay';
import MasterOrder from '@/app/(pages)/(master)/(order)/order';
import Favourite from '@/app/(pages)/(favourity)/favourite';
import ClientCards from './card';
import { getSize } from '@/constants/sizes';
import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const isTablet = screenWidth > 768;

export default function ClientTabLayout() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: {
          backgroundColor: colors.inDarkGreen,
          paddingBottom: 20,
          paddingTop: 5,
          height: isTablet ? 120 : 80,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="dashboard"
        component={ClientDashboard}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="space-dashboard" size={getSize('mediumText') + (isTablet ? 15 : 5)} color={color} style={{ width: isTablet ? 55 : 22 }} />
          )
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrdersDay}
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={getSize('mediumText') + (isTablet ? 15 : 5)} color={color} style={{ width: isTablet ? 55 : 22 }}/>
          )
        }}
      />
      <Tab.Screen
        name="Card"
        component={ClientCards}
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <Entypo name="credit-card" size={getSize('mediumText') + (isTablet ? 15 : 5)} color={color} style={{ width: isTablet ? 60 : 22 }}/>
          )
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          title: "Favourite",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmarks-sharp" size={getSize('mediumText') + (isTablet ? 15 : 5)} color={color} style={{ width: isTablet ? 55 : 22 }}/>
          )
        }}
      />
    </Tab.Navigator>
  );
}
