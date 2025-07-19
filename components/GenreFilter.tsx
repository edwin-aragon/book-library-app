import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { styles } from './GenreFilterStyles';

interface GenreFilterProps {
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

const genres = [
  { id: 'all', name: 'All' },
  { id: 'fiction', name: 'Fiction' },
  { id: 'non-fiction', name: 'Non-Fiction' },
  { id: 'mystery', name: 'Mystery' },
  { id: 'romance', name: 'Romance' },
  { id: 'sci-fi', name: 'Sci-Fi' },
  { id: 'fantasy', name: 'Fantasy' },
  { id: 'biography', name: 'Biography' },
  { id: 'history', name: 'History' },
  { id: 'classic', name: 'Classic' },
];

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onGenreSelect }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {genres.map((genre) => (
        <TouchableOpacity
          key={genre.id}
          style={[
            styles.genreButton,
            selectedGenre === genre.id && styles.selectedGenreButton,
          ]}
          onPress={() => onGenreSelect(genre.id)}
        >
          <Text
            style={[
              styles.genreText,
              selectedGenre === genre.id && styles.selectedGenreText,
            ]}
          >
            {genre.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default GenreFilter;
