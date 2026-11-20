import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

const MAROON = '#572D35';

export default function SearchScreen() {
  const [search, setSearch] = useState('');

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const requestNumber = useRef(0);

  const formatBook = (item) => {
    const info = item.volumeInfo || {};

    return {
      id: item.id,
      title: info.title || 'Unknown Title',
      author: info.authors?.join(', ') || 'Unknown Author',
      thumbnail: (
        info.imageLinks?.thumbnail ||
        info.imageLinks?.smallThumbnail ||
        ''
      ).replace('http://', 'https://'),
      description: info.description || '',
      pageCount: info.pageCount || 0,
      genres: info.categories || [],
      publisher: info.publisher || 'Unknown',
      publishedDate: info.publishedDate || 'Unknown',
      rating: info.averageRating ?? null,
      ratingsCount: info.ratingsCount ?? 0,
      pagesRead: 0,
    };
  };

  // Retrieve books from Google Books //
  const searchBooks = async (query) => {
    const term = query.trim();

    if (!term) {
      requestNumber.current += 1;
      setBooks([]);
      setError('');
      setLoading(false);
      return;
    }

    const currentRequest = ++requestNumber.current;

    setLoading(true);
    setError('');

    try {
      const API_KEY =
        process.env.EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY;

      let url =
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(term)}&maxResults=40&printType=books`;

      if (API_KEY) {
        url += `&key=${encodeURIComponent(API_KEY)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Google Books error: ${response.status}`);
      }

      const data = await response.json();

      const results = (data.items || [])
        .map(formatBook)
        .filter(
          (book) =>
            book.title !== 'Unknown Title' &&
            book.thumbnail !== ''
        );

      if (currentRequest === requestNumber.current) {
        setBooks(results);
      }
    } catch (err) {
      console.log('Google Books Error:', err.message);

      if (currentRequest === requestNumber.current) {
        setError('Unable to load books. Please try again.');
        setBooks([]);
      }
    } finally {
      if (currentRequest === requestNumber.current) {
        setLoading(false);
      }
    }
  };

  // Load fiction books when the screen opens //
  useEffect(() => {
    searchBooks('subject:fiction');

    return () => {
      requestNumber.current += 1;
    };
  }, []);

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
          onSubmitEditing={() => searchBooks(search)}
          returnKeyType="search"
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Feather name="x" size={19} color={MAROON} />
          </Pressable>
        )}
      </View>

      <Text style={styles.resultsTitle}>Interesting Read</Text>

      {loading && (
        <ActivityIndicator size="large" color={MAROON} />
      )}

      {error ? (
        <Text style={styles.message}>{error}</Text>
      ) : (
        !loading && (
          <Text style={styles.message}>
            {books.length} books found
          </Text>
        )
      )}
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

  resultsTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 18,
    color: MAROON,
    marginTop: 25,
    marginBottom: 15,
  },

  message: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: MAROON,
    textAlign: 'center',
    marginTop: 20,
  },
});