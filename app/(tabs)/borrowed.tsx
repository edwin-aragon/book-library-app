import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useBooks } from '../../context/BookContext';
import { globalStyles } from '../../styles/globalStyles';
import { styles } from './borrowedStyles';

const BorrowedBooksScreen = () => {
  const { borrowedBooks, returnBook, loading } = useBooks();
  const [returningBooks, setReturningBooks] = useState({});

  const handleReturnBook = async (borrowedBook: { title: any; id: any; }) => {
    Alert.alert(
      'Return Book',
      `Are you sure you want to return "${borrowedBook.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Return',
          onPress: async () => {
            setReturningBooks(prev => ({ ...prev, [borrowedBook.id]: true }));
            const result = await returnBook(borrowedBook.id);
            setReturningBooks(prev => ({ ...prev, [borrowedBook.id]: false }));

            if (result.success) {
              Alert.alert('Success', 'Book returned successfully!');
            } else {
              Alert.alert('Error', result.error);
            }
          },
        },
      ]
    );
  };

  const renderBorrowedBook = ({ item }) => (
    <View style={globalStyles.card}>
      <Text style={globalStyles.title}>{item.title}</Text>
      <Text style={globalStyles.subtitle}>by {item.author}</Text>
      <Text style={styles.borrowedDate}>
        Borrowed: {new Date(item.borrowedAt.toDate()).toLocaleDateString()}
      </Text>
      
      <TouchableOpacity
        style={[
          globalStyles.button,
          globalStyles.errorButton,
          returningBooks[item.id] && styles.disabledButton,
        ]}
        onPress={() => handleReturnBook(item)}
        disabled={returningBooks[item.id]}
      >
        <Text style={globalStyles.buttonText}>
          {returningBooks[item.id] ? 'Returning...' : 'Return Book'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (borrowedBooks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No borrowed books</Text>
        <Text style={styles.emptySubtext}>
          Browse books and borrow some to see them here!
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Borrowed Books ({borrowedBooks.length}/3)
        </Text>
      </View>
      
      <FlatList
        data={borrowedBooks}
        renderItem={renderBorrowedBook}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default BorrowedBooksScreen;
