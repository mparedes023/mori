import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

const MAROON = '#572D35';

export default function SearchScreen() {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <Text style={styles.subtitle}>
        Find your next read.
      </Text>

      <View style={styles.searchBar}>
        <Feather name="search" size={21} color={MAROON} />

        <TextInput
          style={styles.searchInput}
          placeholder="Search title, author, or keyword..."
          placeholderTextColor="#8D6470"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Feather name="x" size={19} color={MAROON} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2EE',
    paddingHorizontal: 20,
    paddingTop: 45,
  },

  title: {
    fontFamily: theme.fonts.bold,
    fontSize: 28,
    color: MAROON,
  },

  subtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: MAROON,
    marginTop: 5,
    marginBottom: 22,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E7EC',
    borderWidth: 1,
    borderColor: '#D6BFCB',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },

  searchInput: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: MAROON,
    marginLeft: 10,
  },
});