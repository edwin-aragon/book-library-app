import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import BookCard from './BookCard';
import { styles } from './BookGridStyles';

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

interface BookGridProps {
  books: Book[];
  numColumns?: number;
}

const BookGrid: React.FC<BookGridProps> = ({ books, numColumns = 2 }) => {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 32 - (numColumns - 1) * 8) / numColumns;

  const handleBookPress = (book: Book) => {
    router.push(`/detail/${book.id}`);
  };

  const renderBook = ({ item }: { item: Book }) => (
    <View style={[styles.bookItem, { width: itemWidth }]}>
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
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
    />
  );
};

export default BookGrid;
