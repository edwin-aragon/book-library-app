import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  Text
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { styles } from './BookCardStyles';

// Firebase Timestamp type
interface FirebaseTimestamp {
  toDate(): Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  pages?: number;
  rating?: number;
  borrowedAt?: Date | FirebaseTimestamp;
}

interface Props {
  book: Book;
  onPress?: (event: GestureResponderEvent) => void;
  showBorrowStatus?: boolean;
}

const BookCard: React.FC<Props> = ({
  book,
  onPress,
  showBorrowStatus = false,
}) => {
  const getBorrowedDate = () => {
    if (!book.borrowedAt) return null;
    
    if (typeof book.borrowedAt === 'object' && 'toDate' in book.borrowedAt) {
      return (book.borrowedAt as FirebaseTimestamp).toDate().toLocaleDateString();
    }
    
    return (book.borrowedAt as Date).toLocaleDateString();
  };

  return (
    <Pressable style={[globalStyles.card]} onPress={onPress}>
      <Text style={globalStyles.title}>{book.title}</Text>
      <Text style={globalStyles.subtitle}>by {book.author}</Text>

      {book.genre ? (
        <Text style={styles.meta}>
          Genre: <Text style={styles.metaValue}>{book.genre}</Text>
        </Text>
      ) : null}

      {book.pages ? (
        <Text style={styles.meta}>
          Pages: <Text style={styles.metaValue}>{book.pages}</Text>
        </Text>
      ) : null}

      {typeof book.rating === 'number' ? (
        <Text style={styles.rating}>Rating: {book.rating}/5</Text>
      ) : null}

      {showBorrowStatus && book.borrowedAt ? (
        <Text style={styles.borrowedDate}>Borrowed: {getBorrowedDate()}</Text>
      ) : null}
    </Pressable>
  );
};

export default BookCard;
