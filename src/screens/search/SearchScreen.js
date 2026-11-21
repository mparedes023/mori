import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  Keyboard,
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

const MAROON = '#572D35';
const ORANGE = '#D87939';
const DEFAULT_SEARCH = 'subject:fiction';

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

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Genre states
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreWidth, setGenreWidth] = useState(0);
  const [genreContentWidth, setGenreContentWidth] = useState(0);
  const [genreOffset, setGenreOffset] = useState(0);

  // Recent search states
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentWidth, setRecentWidth] = useState(0);
  const [recentContentWidth, setRecentContentWidth] = useState(0);
  const [recentOffset, setRecentOffset] = useState(0);

  const recentScrollRef = useRef(null);
  const requestNumber = useRef(0);

  // Show swipe hints only when more items are hidden
  const canScrollRecent =
    recentWidth > 0 &&
    recentContentWidth > recentWidth + recentOffset + 5;

  const canScrollGenres =
    genreWidth > 0 &&
    genreContentWidth > genreWidth + genreOffset + 5;

  // Convert Google Books data into MORI's book format
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

  // Save a recent search
  const saveRecentSearch = (term) => {
    const trimmedTerm = term.trim();

    if (!trimmedTerm) return;

    setRecentSearches((previous) =>
      [
        trimmedTerm,
        ...previous.filter(
          (item) =>
            item.toLowerCase() !== trimmedTerm.toLowerCase()
        ),
      ].slice(0, 5)
    );

    recentScrollRef.current?.scrollTo({
      x: 0,
      animated: false,
    });
  };

  // Remove one recent search
  const removeRecentSearch = (item) => {
    setRecentSearches((previous) =>
      previous.filter((searchItem) => searchItem !== item)
    );
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    setRecentOffset(0);
    setRecentContentWidth(0);
  };

  // Retrieve books from Google Books API
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
        throw new Error(
          `Google Books API error: ${response.status}`
        );
      }

      const data = await response.json();

      const results = (data.items || [])
        .map(formatBook)
        .filter(
          (book) =>
            book.title !== 'Unknown Title' &&
            book.thumbnail !== ''
        );

      // Ignore results from older searches
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

  // Load Interesting Reads when the page opens
  useEffect(() => {
    searchBooks(DEFAULT_SEARCH);

    return () => {
      requestNumber.current += 1;
    };
  }, []);

  // Search by title, author, or keyword
  const handleSearch = () => {
    Keyboard.dismiss();

    if (search.trim()) {
      saveRecentSearch(search);
    }

    if (!search.trim() && !selectedGenre) {
      setHasSearched(false);
      searchBooks(DEFAULT_SEARCH);
      return;
    }

    const query = selectedGenre
      ? search.trim()
        ? `${search.trim()} subject:"${selectedGenre}"`
        : `subject:"${selectedGenre}"`
      : search.trim();

    setHasSearched(true);
    searchBooks(query);
  };

  // Filter books by genre
  const handleGenre = (genre) => {
    Keyboard.dismiss();

    const newGenre =
      selectedGenre === genre ? '' : genre;

    setSelectedGenre(newGenre);

    if (!newGenre && !search.trim()) {
      setHasSearched(false);
      searchBooks(DEFAULT_SEARCH);
      return;
    }

    const query = newGenre
      ? search.trim()
        ? `${search.trim()} subject:"${newGenre}"`
        : `subject:"${newGenre}"`
      : search.trim();

    setHasSearched(true);
    searchBooks(query);
  };

  // Open a recent search
  const handleRecentSearch = (item) => {
    Keyboard.dismiss();

    setSearch(item);
    saveRecentSearch(item);

    const query = selectedGenre
      ? `${item} subject:"${selectedGenre}"`
      : item;

    setHasSearched(true);
    searchBooks(query);
  };

  // Clear the search and return to Interesting Reads
  const clearSearch = () => {
    setSearch('');
    setSelectedGenre('');
    setHasSearched(false);
    searchBooks(DEFAULT_SEARCH);
  };

  // Open the selected book's details
  const openBook = (book) => {
    navigation.navigate('BookDetails', { book });
  };

  // Display each book in a two-column card
  const renderBook = ({ item }) => (
    <Pressable
      style={styles.bookCard}
      onPress={() => openBook(item)}
    >
      {/* Cover and bookmark */}
      <View style={styles.coverRow}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.bookCover}
          resizeMode="cover"
        />

        <View style={styles.bookmarkButton}>
          <Feather
            name="bookmark"
            size={22}
            color={MAROON}
          />
        </View>
      </View>

      {/* Book title */}
      <Text
        style={styles.bookTitle}
        numberOfLines={2}
      >
        {item.title}
      </Text>

      {/* Author */}
      <Text
        style={styles.bookAuthor}
        numberOfLines={1}
      >
        {item.author}
      </Text>

      {/* Ratings only appear when Google provides them */}
      {item.rating != null && (
        <View style={styles.ratingSection}>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome
                key={star}
                name={
                  star <= Math.round(item.rating)
                    ? 'star'
                    : 'star-o'
                }
                size={13}
                color={ORANGE}
              />
            ))}
          </View>

          <Text style={styles.ratingCount}>
            {item.rating.toFixed(1)}
            {item.ratingsCount > 0
              ? ` (${item.ratingsCount.toLocaleString()})`
              : ''}
          </Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.bookRow}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={renderBook}

        ListHeaderComponent={
          <View>
            {/* Search Title */}
            <Text style={styles.title}>Search</Text>

            <Text style={styles.subtitle}>
              Find your next read.
            </Text>

            {/* Search Bar */}
            <View style={styles.searchBar}>
              <Feather
                name="search"
                size={21}
                color={MAROON}
              />

              <TextInput
                style={styles.searchInput}
                placeholder="Search title, author, or keyword..."
                placeholderTextColor="#8D6470"
                value={search}
                onChangeText={setSearch}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />

              {search.length > 0 && (
                <Pressable
                  onPress={clearSearch}
                  hitSlop={8}
                >
                  <Feather
                    name="x"
                    size={19}
                    color={MAROON}
                  />
                </Pressable>
              )}
            </View>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    Recent Searches
                  </Text>

                  <View style={styles.recentActions}>
                    {canScrollRecent && (
                      <View style={styles.swipeHint}>
                        <Text style={styles.swipeText}>
                          Swipe
                        </Text>

                        <Feather
                          name="arrow-right"
                          size={14}
                          color="#8D6470"
                        />
                      </View>
                    )}

                    <Pressable
                      onPress={clearRecentSearches}
                    >
                      <Text style={styles.clearText}>
                        Clear
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <ScrollView
                  ref={recentScrollRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  onLayout={(event) =>
                    setRecentWidth(
                      event.nativeEvent.layout.width
                    )
                  }
                  onContentSizeChange={(width) =>
                    setRecentContentWidth(width)
                  }
                  onScroll={(event) =>
                    setRecentOffset(
                      event.nativeEvent.contentOffset.x
                    )
                  }
                  scrollEventThrottle={16}
                >
                  {recentSearches.map((item) => (
                    <View
                      key={item}
                      style={styles.recentChip}
                    >
                      <Pressable
                        style={styles.recentTextArea}
                        onPress={() =>
                          handleRecentSearch(item)
                        }
                      >
                        <Feather
                          name="clock"
                          size={14}
                          color={MAROON}
                        />

                        <Text style={styles.chipText}>
                          {item}
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() =>
                          removeRecentSearch(item)
                        }
                        style={styles.removeButton}
                        hitSlop={8}
                      >
                        <Feather
                          name="x"
                          size={15}
                          color={MAROON}
                        />
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Browse by Genre */}
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
                keyboardShouldPersistTaps="handled"
                onLayout={(event) =>
                  setGenreWidth(
                    event.nativeEvent.layout.width
                  )
                }
                onContentSizeChange={(width) =>
                  setGenreContentWidth(width)
                }
                onScroll={(event) =>
                  setGenreOffset(
                    event.nativeEvent.contentOffset.x
                  )
                }
                scrollEventThrottle={16}
              >
                {genres.map((genre) => (
                  <Pressable
                    key={genre}
                    style={[
                      styles.genreButton,
                      selectedGenre === genre &&
                        styles.selectedGenre,
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

            {/* Interesting Reads or Search Results */}
            <Text style={styles.resultsTitle}>
              {hasSearched
                ? 'Search Results'
                : 'Interesting Reads'}
            </Text>

            {/* Loading */}
            {loading && (
              <ActivityIndicator
                size="large"
                color={MAROON}
                style={styles.loader}
              />
            )}

            {/* Error Message */}
            {error ? (
              <Text style={styles.message}>
                {error}
              </Text>
            ) : null}
          </View>
        }

        ListEmptyComponent={
          !loading && !error ? (
            <Text style={styles.message}>
              No books found. Try another search or genre.
            </Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2EE',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 80,
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

  // Genre styles
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

  // Recent search styles
  recentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  clearText: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: MAROON,
    textDecorationLine: 'underline',
  },

  recentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EACDD1',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    gap: 8,
  },

  recentTextArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  removeButton: {
    paddingLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chipText: {
    fontFamily: theme.fonts.medium,
    fontSize: 11,
    color: MAROON,
  },

  // Book card styles
  bookRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'stretch',
  },

  bookCard: {
    width: '48%',
    backgroundColor: '#F5E7E3',
    borderRadius: 12,
    padding: 12,
  },

  coverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  bookCover: {
    width: 85,
    height: 125,
    borderRadius: 6,
    backgroundColor: '#E8C5D4',
  },

  bookmarkButton: {
    padding: 2,
  },

  bookTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 12,
    color: MAROON,
    marginBottom: 5,
  },

  bookAuthor: {
    fontFamily: theme.fonts.regular,
    fontSize: 10,
    color: MAROON,
    marginBottom: 8,
  },

  ratingSection: {
    marginTop: 3,
  },

  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  ratingCount: {
    fontFamily: theme.fonts.regular,
    fontSize: 10,
    color: MAROON,
    marginTop: 5,
  },

  loader: {
    marginVertical: 25,
  },
});