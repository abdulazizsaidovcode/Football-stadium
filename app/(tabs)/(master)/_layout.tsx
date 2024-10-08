import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';
import MasterDashboardScreen from './dashboard';
import MasterStadiumScreen from './stadium';
import MasterOrdersScreen from './orders';
import MasterCards from './card';

function MasterTabLayout() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.white,
          tabBarStyle: {
            backgroundColor: colors.inDarkGreen,
            paddingBottom: 13,
            paddingTop: 10,
            height: 70
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="dashboard"
          component={MasterDashboardScreen}
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Octicons name="home" size={30} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Stadium"
          component={MasterStadiumScreen}
          options={{
            title: "Stadium",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="stadium" size={30} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Order"
          component={MasterOrdersScreen}
          options={{
            title: "Order",
            tabBarIcon: ({ color }) => (
              <Entypo name="ticket" size={30} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={MasterCards}
          options={{
            title: "Card",
            tabBarIcon: ({ color }) => (
              <Entypo name="credit-card" size={30} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default MasterTabLayout;