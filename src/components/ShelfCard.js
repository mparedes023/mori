import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export default function ShelfCard({
  title,
  count,
  color,
  icon,
  image,
  onPress,
}) {
  return (
    <Pressable
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View style={styles.heading}>
        <Feather name={icon} size={22} color="#251C1B" />

        <Text style={styles.title}>
          {title}
        </Text>
      </View>

      <Text style={styles.count}>
        {count} {count === 1 ? 'book' : 'books'}
      </Text>

      <Image
        source={image}
        style={styles.shelfImage}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: 145,
    borderRadius: 18,
    padding: 12,
    overflow: 'hidden',
  },

  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    zIndex: 1,
  },

  title: {
    flex: 1,
    fontFamily: theme.fonts.bold,
    fontSize: 12,
    color: '#251C1B',
  },

  count: {
    fontFamily: theme.fonts.regular,
    fontSize: 11,
    marginTop: 5,
    color: '#554C49',
    zIndex: 1,
  },

  shelfImage: {
    position: 'absolute',
    width: '100%',
    height: 85,
    bottom: 0,
    right: 0,
  },
});
