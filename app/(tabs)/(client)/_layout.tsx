import { colors } from '@/constants/Colors';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ClientDashboard from './dashboard';
import ClientProfile from './profile';

export default function ClientTabLayout() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.white,
          tabBarStyle: {
            backgroundColor: colors.inDarkGreen,
            paddingBottom: 10,
            paddingTop: 5,
            height: 70
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
          name="Profile"
          component={ClientProfile}
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-alt" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </>
  );
}
