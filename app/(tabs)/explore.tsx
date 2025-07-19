import BookCard from '@/components/BookCard';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import GenreFilter from '../../components/GenreFilter';
import HorizontalBookList from '../../components/HorizontalBookList';
import LoadingSpinner from '../../components/LoadingSpinner';
import ReadingChallengeCard from '../../components/ReadingChallengeCard';
import Section from '../../components/Section';
import { useBooks } from '../../context/BookContext';
import { globalStyles } from '../../styles/globalStyles';
import { styles } from './exploreStyles';
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
export default function ExploreScreen() {
  const { books, borrowedBooks, loading, error } = useBooks();
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [recommendations, setRecommendations] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

 const filterByGenre = (books: Book[], genre: string): Book[] => {
    if (genre === 'all') return books;
    return books.filter(book => 
      book.genre?.toLowerCase().includes(genre.toLowerCase())
    );
  };

  // Generate recommendations based on borrowed books
  useEffect(() => {
    if (books.length > 0) {
      // Get genres from borrowed books
      const borrowedGenres = borrowedBooks.map(book => {
        const fullBook = books.find(b => b.id === book.bookId);
        return fullBook?.genre;
      }).filter(Boolean);

      // Recommend books from same genres
      const recommended = books.filter(book => 
        borrowedGenres.includes(book.genre) && 
        !borrowedBooks.some(borrowed => borrowed.bookId === book.id)
      ).slice(0, 5);

      setRecommendations(recommended as []);

      // Mock trending books (highest rated)
      const trending = [...books]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5);
      setTrendingBooks(trending as []);

      // Mock new arrivals (most recent by publishedYear)
      const newBooks = [...books]
        .sort((a, b) => (b.publishedYear || 0) - (a.publishedYear || 0))
        .slice(0, 5);
      setNewArrivals(newBooks as []);
    }
  }, [books, borrowedBooks]);

  const filteredBooks = filterByGenre(books, selectedGenre);

  // Create sections data for FlatList
  const sectionsData = [
    { id: 'challenge', type: 'challenge' },
    { id: 'recommendations', type: 'recommendations' },
    { id: 'trending', type: 'trending' },
    { id: 'new-arrivals', type: 'new-arrivals' },
    { id: 'genre-filter', type: 'genre-filter' },
    { id: 'genre-results', type: 'genre-results' },
  ];

  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'challenge':
        return (
          <Section title="Your Reading Challenge">
            <ReadingChallengeCard borrowedBooksCount={borrowedBooks.length} />
          </Section>
        );
      
      case 'recommendations':
        return recommendations.length > 0 ? (
          <Section title="Recommended for You">
            <HorizontalBookList books={recommendations} />
          </Section>
        ) : null;
      
      case 'trending':
        return (
          <Section title="Trending Now">
            <HorizontalBookList books={trendingBooks} />
          </Section>
        );
      
      case 'new-arrivals':
        return (
          <Section title="New Arrivals">
            <HorizontalBookList books={newArrivals} />
          </Section>
        );
      
      case 'genre-filter':
        return (
          <Section title="Browse by Genre">
            <GenreFilter
              selectedGenre={selectedGenre}
              onGenreSelect={setSelectedGenre}
            />
          </Section>
        );
      
      case 'genre-results':
        return (
          <View style={styles.genreResults}>
            <Text style={styles.genreResultsText}>
              {filteredBooks.length} books in {selectedGenre === 'all' ? 'all genres' : selectedGenre}
            </Text>
            {/* Use a simple grid instead of FlatList */}
            <View style={styles.booksGrid}>
              {filteredBooks.map((book, index) => (
                <View key={book.id} style={styles.bookItem}>
                  <BookCard
                    book={book}
                    onPress={() => router.push(`/detail/${book.id}`)}
                  />
                </View>
              ))}
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sectionsData}
      renderItem={renderSection}
      keyExtractor={(item) => item.id}
      style={globalStyles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}