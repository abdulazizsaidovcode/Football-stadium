import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
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
            paddingBottom: 20,
            paddingTop: 10,
            height: 80
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
              <Octicons name="home" size={30} color={color} />
            )
          }}
        />
        <Tab.Screen
          name="Stadium"
          component={MasterStadium}
          options={{
            title: "Stadium",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="stadium" size={30} color={color} />
            )
          }}
        />
        {/* <Tab.Screen
          name="Profile"
          component={MasterProfile}
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={27} color={color} />
            )
          }} */}
        {/* /> */}
      </Tab.Navigator>
    </>
  );
}

export default MasterTabLayout;