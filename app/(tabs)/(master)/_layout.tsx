import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MasterDashboard from './dashboard';
import MasterStadium from './stadium';
import MasterProfile from './profile';
import { colors } from '@/constants/Colors';

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
            paddingBottom: 10,
            paddingTop: 5,
            height: 70
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="dashboard"
          component={MasterDashboard}
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="space-dashboard" size={27} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Stadium"
          component={MasterStadium}
          options={{
            title: "Stadium",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="stadium" size={27} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={MasterProfile}
          options={{
            title: "Stadium",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-alt" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default MasterTabLayout;