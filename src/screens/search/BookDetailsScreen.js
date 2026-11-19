import { View, Text, StyleSheet } from 'react-native';

export default function BookDetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Details</Text>

      <Text style={styles.message}>
        Book details will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4B6CF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#251C1B',
  },
  message: {
    fontSize: 14,
    marginTop: 10,
    color: '#554C49',
  },
});
