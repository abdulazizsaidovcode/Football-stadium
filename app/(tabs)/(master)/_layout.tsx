import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Entypo, MaterialCommunityIcons, MaterialIcons, Octicons} from '@expo/vector-icons';
import {colors} from '@/constants/Colors';
import MasterDashboardScreen from './dashboard';
import MasterStadiumScreen from './stadium';
import MasterOrdersScreen from './orders';
import MasterCards from './card';
import { getSize } from '@/constants/sizes';
import { Dimensions } from 'react-native';

const {width: screenWidth} = Dimensions.get('window')
const isTablet = screenWidth > 768;

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
                        height: isTablet ? 120 : 80,
                    },
                    headerShown: false,
                })}
            >
                <Tab.Screen
                    name="dashboard"
                    component={MasterDashboardScreen}
                    options={{
                        title: "Home",
                        tabBarIcon: ({color}) => (
                            <Octicons name="home" size={getSize('mediumText') + (isTablet ? 15 : 5)} style={{width: isTablet ? 55 : 22}} color={color}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Stadium"
                    component={MasterStadiumScreen}
                    options={{
                        title: "Stadium",
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="stadium" size={getSize('mediumText') + (isTablet ? 15 : 5)} style={{width: isTablet ? 59 : 22}} color={color}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Order"
                    component={MasterOrdersScreen}
                    options={{
                        title: "Order",
                        tabBarIcon: ({color}) => (
                            <Entypo name="ticket" size={getSize('mediumText') + (isTablet ? 15 : 5)} style={{width: isTablet ? 55 : 22}} color={color}/>
                        )
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={MasterCards}
                    options={{
                        title: "Card",
                        tabBarIcon: ({color}) => (
                            <Entypo name="credit-card" size={getSize('mediumText') + (isTablet ? 15 : 5)} style={{width: isTablet ? 59 : 22}} color={color}/>
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    );
}

export default MasterTabLayout;