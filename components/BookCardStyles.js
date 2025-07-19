import { StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

export const styles = StyleSheet.create({
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  metaValue: {
    color: colors.text,
    fontWeight: '600',
  },
  rating: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
    marginTop: 4,
  },
  borrowedDate: {
    fontSize: 12,
    color: colors.success,
    fontStyle: 'italic',
    marginTop: 4,
  },
});