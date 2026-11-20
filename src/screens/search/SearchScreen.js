import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

const MAROON = '#572D35';

const genres = [
  'Fiction',
  'Science Fiction',
  'Romance',
  'Mystery',
  'Fantasy',
  'Thriller',
  'Horror',
  'Historical Fiction',
  'Biography',
];

export default function SearchScreen() {
  const [search, setSearch] = useState('');

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const requestNumber = useRef(0);

  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreWidth, setGenreWidth] = useState(0);
  const [genreContentWidth, setGenreContentWidth] = useState(0);
  const [genreOffset, setGenreOffset] = useState(0);

  const canScrollGenres =
    genreWidth > 0 &&
    genreContentWidth > genreWidth + genreOffset + 5;

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

  const handleGenre = (genre) => {
    const newGenre = selectedGenre === genre ? '' : genre;

    setSelectedGenre(newGenre);

    if (newGenre) {
      const query = search.trim()
        ? `${search.trim()} subject:"${newGenre}"`
        : `subject:"${newGenre}"`;

      searchBooks(query);
    } else {
      searchBooks(search.trim() || 'subject:fiction');
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
          onSubmitEditing={() => {
            const query = selectedGenre
              ? `${search.trim()} subject:"${selectedGenre}"`
              : search.trim() || 'subject:fiction';

            searchBooks(query);
          }}
          returnKeyType="search"
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Feather name="x" size={19} color={MAROON} />
          </Pressable>
        )}
      </View>


      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Browse by Genre
          </Text>

          {canScrollGenres && (
            <View style={styles.swipeHint}>
              <Text style={styles.swipeText}>
                Swipe to explore
              </Text>
              <Feather
                name="arrow-right"
                size={15}
                color="#8D6470"
              />
            </View>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onLayout={(event) =>
            setGenreWidth(event.nativeEvent.layout.width)
          }
          onContentSizeChange={(width) =>
            setGenreContentWidth(width)
          }
          onScroll={(event) =>
            setGenreOffset(event.nativeEvent.contentOffset.x)
          }
          scrollEventThrottle={16}
        >
          {genres.map((genre) => (
            <Pressable
              key={genre}
              style={[
                styles.genreButton,
                selectedGenre === genre && styles.selectedGenre,
              ]}
              onPress={() => handleGenre(genre)}
            >
              <Feather
                name={
                  genre === 'Romance'
                    ? 'heart'
                    : genre === 'Mystery'
                      ? 'search'
                      : genre === 'Fantasy'
                        ? 'star'
                        : genre === 'Horror'
                          ? 'moon'
                          : genre === 'Thriller'
                            ? 'zap'
                            : 'book-open'
                }
                size={22}
                color={MAROON}
              />

              <Text style={styles.genreText}>
                {genre}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
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

  section: {
    marginTop: 25,
    marginBottom: 10,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 18,
    color: MAROON,
  },

  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  swipeText: {
    fontFamily: theme.fonts.regular,
    fontSize: 10,
    color: '#8D6470',
  },

  genreButton: {
    backgroundColor: '#EED7D7',
    width: 95,
    height: 85,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    padding: 5,
  },

  selectedGenre: {
    borderWidth: 2,
    borderColor: MAROON,
  },

  genreText: {
    fontFamily: theme.fonts.medium,
    fontSize: 10,
    color: MAROON,
    marginTop: 10,
    textAlign: 'center',
  },
});