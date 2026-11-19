import { useCallback, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import ShelfCard from '../../components/ShelfCard';
import { theme } from '../../constants/theme';

// Shelf illustrations //
const shelfImages = {
  all: require('../../../assets/shelves/mori_allBooks.png'),
  tbr: require('../../../assets/shelves/mori_toBeRead.png'),
  current: require('../../../assets/shelves/mori_currentlyReading.png'),
  read: require('../../../assets/shelves/mori_read.png'),
  favorites: require('../../../assets/shelves/mori_favorites.png'),
  unfinished: require('../../../assets/shelves/mori_didNotFinish.png'),
};

// Greeting based on the phone's local time //
function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { message: 'Good Morning', emoji: '☀️' };
  } else if (hour >= 12 && hour < 17) {
    return { message: 'Good Afternoon', emoji: '🌤️' };
  } else if (hour >= 17 && hour < 21) {
    return { message: 'Good Evening', emoji: '🌆' };
  } else {
    return { message: 'Good Night', emoji: '🌙' };
  }
}

export default function HomeScreen({
  navigation,
  user = null,
  books = [],
}) {
  const [greeting, setGreeting] = useState(getGreeting());

  // Refresh greeting when returning to Home //
  useFocusEffect(
    useCallback(() => {
      setGreeting(getGreeting());
    }, [])
  );

  // User information //
  const userName =
    user?.firstName ||
    user?.displayName?.split(' ')[0] ||
    'Reader';

  const yearlyGoal = Number(user?.yearlyGoal) || 0;
  const currentYear = new Date().getFullYear();

  // Organize books into shelves //
  const tbrBooks = books.filter(
    book => book.status === 'To Be Read'
  );

  const currentBooks = books.filter(
    book => book.status === 'Currently Reading'
  );

  const readBooks = books.filter(
    book => book.status === 'Already Read'
  );

  const favoriteBooks = books.filter(
    book => book.isFavorite === true
  );

  const unfinishedBooks = books.filter(
    book => book.status === 'Did Not Finish'
  );

  // Reading goal progress //
  const booksReadThisYear = readBooks.filter(book => {
    if (!book.completedDate) return false;

    return new Date(book.completedDate).getFullYear() === currentYear;
  }).length;

  const goalProgress = yearlyGoal > 0
    ? Math.min((booksReadThisYear / yearlyGoal) * 100, 100)
    : 0;

  // Continue Reading //
  const currentBook = currentBooks[0];

  const currentPage = Number(currentBook?.currentPage) || 0;
  const totalPages = Number(currentBook?.pageCount) || 0;

  const bookProgress = totalPages > 0
    ? Math.min((currentPage / totalPages) * 100, 100)
    : 0;

  // Shelf information //
  const shelves = [
    {
      title: 'All Books',
      count: books.length,
      color: '#F5E7DB',
      icon: 'book-open',
      type: 'all',
      image: shelfImages.all,
    },
    {
      title: 'To Be Read',
      count: tbrBooks.length,
      color: '#F3DDD8',
      icon: 'bookmark',
      type: 'tbr',
      image: shelfImages.tbr,
    },
    {
      title: 'Currently Reading',
      count: currentBooks.length,
      color: '#E8E8DA',
      icon: 'book-open',
      type: 'current',
      image: shelfImages.current,
    },
    {
      title: 'Read',
      count: readBooks.length,
      color: '#E3E7ED',
      icon: 'check-circle',
      type: 'read',
      image: shelfImages.read,
    },
    {
      title: 'Favorites',
      count: favoriteBooks.length,
      color: '#EEE1E9',
      icon: 'star',
      type: 'favorites',
      image: shelfImages.favorites,
    },
    {
      title: 'Did Not Finish',
      count: unfinishedBooks.length,
      color: '#EDE2D9',
      icon: 'x-circle',
      type: 'unfinished',
      image: shelfImages.unfinished,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Greeting Banner */}
      <View style={styles.welcomeCard}>
        <ImageBackground
          source={require('../../../assets/mori_greeting.png')}
          style={styles.welcomeBackground}
          imageStyle={styles.welcomeImage}
          resizeMode="cover"
        >
          <Text style={styles.welcomeTitle}>
            {greeting.message}, {userName} {greeting.emoji}
          </Text>

          <Text style={styles.welcomeSubtitle}>
            What are you reading today?
          </Text>
        </ImageBackground>

        {/* Reading Goal */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeading}>
            <Feather
              name="target"
              size={22}
              color="#38251B"
            />

            <Text style={styles.goalTitle}>
              Reading Goal
            </Text>

            {yearlyGoal > 0 && (
              <Text style={styles.goalPercentage}>
                {Math.round(goalProgress)}%
              </Text>
            )}
          </View>

          {yearlyGoal > 0 ? (
            <>
              <Text style={styles.goalSubtitle}>
                {yearlyGoal} books this year
              </Text>

              <View style={styles.progressRow}>
                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${goalProgress}%` },
                    ]}
                  />
                </View>

                <Text style={styles.goalCount}>
                  {booksReadThisYear}/{yearlyGoal}
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.goalSubtitle}>
              Set a reading goal in your profile.
            </Text>
          )}
        </View>
      </View>

      {/* Your Shelves */}
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>
          Your Shelves
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Shelf', {
              shelfType: 'all',
              shelfTitle: 'All Books',
              books,
            })
          }
        >
          <Text style={styles.viewAll}>
            View All →
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.shelfGrid}>
        {shelves.map(shelf => (
          <ShelfCard
            key={shelf.type}
            title={shelf.title}
            count={shelf.count}
            color={shelf.color}
            icon={shelf.icon}
            image={shelf.image}
            onPress={() =>
              navigation.navigate('Shelf', {
                shelfType: shelf.type,
                shelfTitle: shelf.title,
                books,
              })
            }
          />
        ))}
      </View>

      {/* Continue Reading */}
      <Text style={styles.sectionTitle}>
        Continue Reading
      </Text>

      {currentBook ? (
        <TouchableOpacity
          style={styles.continueCard}
          onPress={() =>
            navigation.navigate('BookDetails', {
              bookId: currentBook.id,
            })
          }
        >
          {currentBook.thumbnail ? (
            <Image
              source={{ uri: currentBook.thumbnail }}
              style={styles.bookCover}
            />
          ) : (
            <View style={styles.emptyCover}>
              <Feather
                name="book"
                size={28}
                color="#57304F"
              />
            </View>
          )}

          <View style={styles.bookInfo}>
            <Text
              style={styles.bookTitle}
              numberOfLines={2}
            >
              {currentBook.title}
            </Text>

            <Text
              style={styles.bookAuthor}
              numberOfLines={1}
            >
              {Array.isArray(currentBook.authors)
                ? currentBook.authors.join(', ')
                : currentBook.authors || 'Unknown Author'}
            </Text>

            <View style={styles.bookProgressRow}>
              <View style={styles.bookProgressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${bookProgress}%` },
                  ]}
                />
              </View>

              <Text style={styles.pageText}>
                p. {currentPage}/{totalPages} ({Math.round(bookProgress)}%)
              </Text>
            </View>
          </View>

          <Feather
            name="chevron-right"
            size={25}
            color="#38251B"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyReading}>
          <Feather
            name="book-open"
            size={25}
            color="#57304F"
          />

          <Text style={styles.emptyText}>
            No books currently being read.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F2EE',
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 125,
    paddingBottom: 35,
  },

  // Greeting Banner //
  welcomeCard: {
    borderRadius: 22,
    marginBottom: 24,
    backgroundColor: '#EAD8CC',
    overflow: 'hidden',
  },

  welcomeBackground: {
    height: 180,
    paddingHorizontal: 18,
    paddingTop: 22,
    backgroundColor: '#EAD8CC',
  },

  welcomeImage: {
    opacity: 0.5,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  welcomeTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 21,
    color: '#38251B',
  },

  welcomeSubtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    marginTop: 7,
    color: '#38251B',
  },

  // Reading Goal
  goalCard: {
    backgroundColor: '#FFF8F4',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 12,
    marginTop: -28,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#38251B',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  goalHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  goalTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 14,
    color: '#251C1B',
    flex: 1,
  },

  goalPercentage: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    color: '#38251B',
    backgroundColor: '#EADFD9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },

  goalSubtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    marginTop: 7,
    color: '#554C49',
  },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },

  progressBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#E8DCD7',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#4A2D1E',
    borderRadius: 10,
  },

  goalCount: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    color: '#38251B',
  },

  // Shelves //
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 19,
    color: '#251C1B',
    marginBottom: 12,
  },

  viewAll: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    color: '#38251B',
  },

  shelfGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 26,
  },

  // Continue Reading //
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F4',
    padding: 12,
    borderRadius: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EDE3DD',
  },

  bookCover: {
    width: 65,
    height: 95,
    borderRadius: 5,
  },

  emptyCover: {
    width: 65,
    height: 95,
    backgroundColor: '#E8DCD7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  bookInfo: {
    flex: 1,
  },

  bookTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 14,
    color: '#251C1B',
  },

  bookAuthor: {
    fontFamily: theme.fonts.regular,
    fontSize: 11,
    marginTop: 5,
    color: '#554C49',
  },

  bookProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },

  bookProgressBackground: {
    flex: 1,
    height: 9,
    backgroundColor: '#E8DCD7',
    borderRadius: 10,
    overflow: 'hidden',
  },

  pageText: {
    fontFamily: theme.fonts.regular,
    fontSize: 9,
    color: '#554C49',
  },

  emptyReading: {
    backgroundColor: '#FFF8F4',
    padding: 22,
    borderRadius: 18,
    alignItems: 'center',
    gap: 10,
  },

  emptyText: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: '#554C49',
    textAlign: 'center',
  },
});