import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import BookCard from '../../components/BookCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useBooks } from '../../context/BookContext';
import { globalStyles } from '../../styles/globalStyles';
import { styles } from './indexStyles';

export default function BookListScreen() {
  const { books, loading, error } = useBooks();
  const router = useRouter();

  const handleBookPress = (book: any) => {
    router.push(`/detail/${book.id}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorSubtext}>Please check your internet connection and try again.</Text>
      </View>
    );
  }

  if (books.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No books available</Text>
        <Text style={styles.emptySubtext}>Please add some books to your Firebase database.</Text>
      </View>
    );
  }

  const renderBookItem = ({ item }: { item: any }) => (
    <BookCard
      book={item}
      onPress={() => handleBookPress(item)}
    />
  );

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
