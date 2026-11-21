import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import HomeStackNavigator from './HomeStackNavigator';
import SearchScreen from '../screens/search/SearchScreen';
import MysteryMatchScreen from '../screens/home/MysteryMatchScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const MAROON = '#572D35';
const MUTED = '#977F87';

const tabIcons = {
  Home: 'home',
  Search: 'search',
  Mystery: 'help-circle',
  Profile: 'user',
};

function GlassTabBar({ state, descriptors, navigation }) {

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarContainer,
    {
      paddingBottom: insets.bottom + 10,
    },
    ]}>
      <View style={styles.glassBar}>
        <BlurView
          intensity={65}
          tint="light"
          style={StyleSheet.absoluteFill}
        />

        <LinearGradient
          colors={[
            'rgba(255,255,255,0.30)',
            'rgba(255,255,255,0.08)',
          ]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.tabsRow}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];

            const label =
              typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                accessibilityRole="tab"
                accessibilityState={{
                  selected: isFocused,
                }}
                style={[
                  styles.tabButton,
                  isFocused && styles.activeTab,
                ]}
              >
                <Feather
                  name={tabIcons[route.name] || 'circle'}
                  size={21}
                  color={isFocused ? MAROON : MUTED}
                />

                <Text
                  style={[
                    styles.tabLabel,
                    isFocused && styles.activeLabel,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: '#F8F2EE',
        }
      }}
    >

      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />

      <Tab.Screen
        name="Mystery"
        component={MysteryMatchScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  paddingHorizontal: 18,
  paddingTop: 8,
  backgroundColor: 'transparent',
  justifyContent: 'flex-end',
},

  glassBar: {
    height: 72,
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  tabsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 7,
  },

  tabButton: {
    flex: 1,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    marginHorizontal: 3,
    gap: 4,
  },

  activeTab: {
    backgroundColor: 'rgba(234,205,209,0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
  },

  tabLabel: {
    fontSize: 10,
    color: MUTED,
  },

  activeLabel: {
    color: MAROON,
    fontWeight: '700',
  },
});