import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet,SafeAreaView} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoriHeader from './src/components/MoriHeader';
import AccountCreationScreen from './src/screens/auth/AccountCreationScreen';
import AuthScreen from './src/screens/auth/AuthScreen';
import TabNavigator from './src/navigation/TabNavigator';
import BookDetailsScreen from './src/screens/search/BookDetailsScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import { UserProvider } from './src/context/UserContext';
import {
  useFonts,
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_700Bold,
} from '@expo-google-fonts/roboto-mono';

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
  <UserProvider>
    <NavigationContainer>

      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="auto" />  
 
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="AccountCreation" component={AccountCreationScreen} />
          <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />

        </Stack.Navigator>          
        <View style={styles.headerWrapper} pointerEvents="box-none">
          <MoriHeader />
        </View>
      </SafeAreaView>
      
    </NavigationContainer>
</UserProvider>    
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,

  },

  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    paddingTop: 45, 
    backgroundColor: 'transparent',
  },
});