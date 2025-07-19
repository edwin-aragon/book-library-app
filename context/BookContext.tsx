import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  where
} from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase';

// Define the Book interface
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

// Define the BorrowedBook interface
interface BorrowedBook {
  id: string;
  bookId: string;
  userId: string;
  title: string;
  author: string;
  borrowedAt: any; // Firebase Timestamp
}

// Define the context value interface
interface BookContextValue {
  books: Book[];
  borrowedBooks: BorrowedBook[];
  loading: boolean;
  error: string | null;
  borrowBook: (book: Book) => Promise<{ success: boolean; error?: string }>;
  returnBook: (borrowedBookId: string) => Promise<{ success: boolean; error?: string }>;
  fetchBooks: () => Promise<void>;
  fetchBorrowedBooks: () => Promise<void>;
}

// Create context with default value
const BookContext = createContext<BookContextValue | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all books from Firestore
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const booksCollection = collection(db, 'books');
      const booksSnapshot = await getDocs(booksCollection);
      const booksData = booksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBooks(booksData);
    } catch (err) {
      setError('Failed to fetch books');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch borrowed books
  const fetchBorrowedBooks = async () => {
    try {
      const borrowedCollection = collection(db, 'borrowedBooks');
      const q = query(borrowedCollection, where('userId', '==', 'defaultUser'));
      const borrowedSnapshot = await getDocs(q);
      
      const borrowedData = borrowedSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as BorrowedBook[];
      setBorrowedBooks(borrowedData);
    } catch (err) {
      setError('Failed to fetch borrowed books');
      console.error('Error fetching borrowed books:', err);
    }
  };

  // Borrow a book
  const borrowBook = async (book: Book) => {
    try {
      // Check if already borrowed
      const isAlreadyBorrowed = borrowedBooks.some(
        borrowedBook => borrowedBook.bookId === book.id
      );
      
      if (isAlreadyBorrowed) {
        throw new Error('Book is already borrowed');
      }

      // Check if user has reached the limit of 3 books
      if (borrowedBooks.length >= 3) {
        //throw new Error('You cannot borrow more than 3 books at a time');
        return { success: false, error: 'You cannot borrow more than 3 books at a time' };
      }

      const borrowData = {
        bookId: book.id,
        userId: 'defaultUser',
        title: book.title,
        author: book.author,
        borrowedAt: Timestamp.now(),
      };

      const borrowedCollection = collection(db, 'borrowedBooks');
      await addDoc(borrowedCollection, borrowData);
      await fetchBorrowedBooks(); // Refresh borrowed books
      return { success: true };
    } catch (err) {
      console.error('Error borrowing book:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  // Return a book
  const returnBook = async (borrowedBookId: string) => {
    try {
      const bookDoc = doc(db, 'borrowedBooks', borrowedBookId);
      await deleteDoc(bookDoc);
      await fetchBorrowedBooks(); // Refresh borrowed books
      return { success: true };
    } catch (err) {
      console.error('Error returning book:', err);
      return { success: false, error: (err as Error).message };
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooks();
  }, []);

  const value: BookContextValue = {
    books,
    borrowedBooks,
    loading,
    error,
    borrowBook,
    returnBook,
    fetchBooks,
    fetchBorrowedBooks,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};
