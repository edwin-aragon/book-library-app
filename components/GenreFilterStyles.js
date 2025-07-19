import { StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  genreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedGenreButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genreText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  selectedGenreText: {
    color: colors.surface,
  },
});