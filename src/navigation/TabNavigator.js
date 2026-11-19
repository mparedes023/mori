
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import MysteryMatchScreen from '../screens/home/MysteryMatchScreen';

import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#083b03',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          backgroundColor: '#ca85e3',
          borderTopColor: '#000000',
          height: 75,
          paddingBottom: 15,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />



        <Tab.Screen
        name="Discover"
        component={MysteryMatchScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

    </Tab.Navigator>
  );
}
