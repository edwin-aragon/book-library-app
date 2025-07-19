import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/globalStyles';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  content: {
    paddingHorizontal: 8,
  },
});

export default Section;
