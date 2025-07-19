import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BookCard from './BookCard';

interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  pages?: number;
  rating?: number;
  publishedYear?: number;
  isbn?: string;
  description?: string;
}

interface HorizontalBookListProps {
  books: Book[];
}

const HorizontalBookList: React.FC<HorizontalBookListProps> = ({ books }) => {
  const router = useRouter();

  const handleBookPress = (book: Book) => {
    router.push(`/detail/${book.id}`);
  };

  const renderBook = ({ item }: { item: Book }) => (
    <View style={styles.bookItem}>
      <BookCard
        book={item}
        onPress={() => handleBookPress(item)}
      />
    </View>
  );

  return (
    <FlatList
      data={books}
      renderItem={renderBook}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  bookItem: {
    width: 280,
    marginRight: 8,
  },
});

export default HorizontalBookList;
