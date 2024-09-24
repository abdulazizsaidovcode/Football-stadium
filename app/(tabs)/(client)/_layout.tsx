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
          height: 80
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
            <MaterialIcons name="space-dashboard" size={27} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="ordersDay"
        component={OrdersDay}
        options={{
          title: "Orders Day",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="MasterOrder"
        component={MasterOrder}
        options={{
          title: "Master Order",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-list" size={27} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Card"
        component={ClientCards}
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <Entypo name="credit-card" size={30} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          title: "Favourite",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmarks-sharp" size={24} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
