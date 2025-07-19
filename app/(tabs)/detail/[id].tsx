import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useBooks } from '../../../context/BookContext';
import { globalStyles } from '../../../styles/globalStyles';
import { styles } from './[id]Styles';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const { books, borrowBook, borrowedBooks } = useBooks();
  const [borrowing, setBorrowing] = useState(false);
  const router = useRouter();

  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Book not found</Text>
        <TouchableOpacity 
          style={globalStyles.button}
          onPress={() => router.back()}
        >
          <Text style={globalStyles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isAlreadyBorrowed = borrowedBooks.some(
    borrowedBook => borrowedBook.bookId === book.id
  );

  const handleBorrowBook = async () => {
    setBorrowing(true);
    const result = await borrowBook(book);
    setBorrowing(false);

    if (result.success) {
      Alert.alert('Success', 'Book borrowed successfully!');
    } else {
      Alert.alert('Error', result.error || 'Failed to borrow book');
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: book?.title || 'Book Details',  // ✅ Use book title or fallback
          headerShown: true,
        }}
      />
      <ScrollView style={globalStyles.container}>
        <View style={styles.content}>
          <View style={globalStyles.card}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>by {book.author}</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.label}>Genre:</Text>
              <Text style={styles.value}>{book.genre}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.label}>Pages:</Text>
              <Text style={styles.value}>{book.pages}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.label}>Published:</Text>
              <Text style={styles.value}>{book.publishedYear}</Text>
            </View>
            
            {book.rating && (
              <View style={styles.detailRow}>
                <Text style={styles.label}>Rating:</Text>
                <Text style={styles.ratingValue}>{book.rating}/5</Text>
              </View>
            )}
            
            {book.isbn && (
              <View style={styles.detailRow}>
                <Text style={styles.label}>ISBN:</Text>
                <Text style={styles.value}>{book.isbn}</Text>
              </View>
            )}
          </View>

          {book.description && (
            <View style={globalStyles.card}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{book.description}</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            {isAlreadyBorrowed ? (
              <View style={[globalStyles.button, globalStyles.successButton]}>
                <Text style={globalStyles.buttonText}>Already Borrowed</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  borrowing && styles.disabledButton,
                ]}
                onPress={handleBorrowBook}
                disabled={borrowing}
              >
                <Text style={globalStyles.buttonText}>
                  {borrowing ? 'Borrowing...' : 'Borrow Book'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
