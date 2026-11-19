import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';
import ShelfScreen from '../screens/library/ShelfScreen';
import BookDetailsScreen from '../screens/search/BookDetailsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Shelf" component={ShelfScreen} />
      <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
    </Stack.Navigator>
  );
}
