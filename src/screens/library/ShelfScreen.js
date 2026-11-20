import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export default function ShelfScreen({ route, navigation }) {
  const { shelfType, shelfTitle, books = [] } = route.params;

  const filteredBooks = books.filter(book => {
    if (shelfType === 'all') return true;
    if (shelfType === 'tbr') return book.status === 'To Be Read';
    if (shelfType === 'current') return book.status === 'Currently Reading';
    if (shelfType === 'read') return book.status === 'Already Read';
    if (shelfType === 'favorites') return book.isFavorite === true;
    if (shelfType === 'unfinished') return book.status === 'Did Not Finish';
    return false;
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={24} color="#57304F" />
        <Text style={styles.back}>Back</Text>
      </Pressable>

      <Text style={styles.title}>{shelfTitle}</Text>

      <Text style={styles.count}>
        {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
      </Text>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item, index) => String(item.id || index)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No books saved on this shelf yet.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.bookCard}
            onPress={() =>
              navigation.navigate('BookDetails', {
                bookId: item.id,
              })
            }
          >
            {item.thumbnail ? (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.cover}
              />
            ) : (
              <View style={styles.placeholder}>
                <Feather name="book" size={32} color="#57304F" />
              </View>
            )}

            <Text style={styles.bookTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4B6CF',
    padding: 18,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  back: {
    fontSize: 16,
    color: '#57304F',
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: 23,
    color: '#251C1B',
  },
  count: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 30,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  bookCard: {
    width: '48%',
    backgroundColor: '#F5E7DB',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  cover: {
    width: 105,
    height: 150,
    borderRadius: 5,
  },
  placeholder: {
    width: 105,
    height: 150,
    backgroundColor: '#E8C5D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookTitle: {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    color: '#251C1B',
  },
  empty: {
    fontFamily: theme.fonts.regular,
    textAlign: 'center',
    marginTop: 40,
    color: '#554C49',
  },
});
