import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../Helpers/colors';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Search from '../Screens/Search';
import NearMe from '../Screens/NearMe';
import Post from '../Screens/Post';

const Tab = createBottomTabNavigator();

export default function TabNavigator( {route} ) {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "goldenrod",
          tabBarStyle: colors.hearderColor,
          headerStyle: colors.hearderColor,
          headerTintColor: "black",
         
        }}
      >
        <Tab.Screen 
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={24} color="black" />
          ),
         }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              navigation.setParams({ tabName: 'Home' });
            },
          })}
        />
        <Tab.Screen 
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <Feather name="search" size={24} color="black" />
          ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              navigation.setParams({ tabName: 'Search' });
            },
          })}
        />


        <Tab.Screen 
          name="Post"
          component={Post}
          options={{
            tabBarLabel: 'Post',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" size={35} color="black" />
          ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              navigation.setParams({ tabName: 'Post' });
            },
          })}
        />

        <Tab.Screen 
          name="Visited Map"
          component={NearMe}
          options={{
            tabBarLabel: 'VisitMap',
            tabBarIcon: ({ color, size }) => (
              <Entypo name="map" size={24} color="black" />
          ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              navigation.setParams({ tabName: 'NearMe' });
            },
          })}
        />


        <Tab.Screen 
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle" size={24} color="black" />
          ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              navigation.setParams({ tabName: 'Profile' });
            },
          })}
        />
        
    </Tab.Navigator>
  );
}

