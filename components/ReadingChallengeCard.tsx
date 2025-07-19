import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, globalStyles } from '../styles/globalStyles';
import { styles } from './ReadingChallengeCardStyles';

interface ReadingChallengeCardProps {
  borrowedBooksCount: number;
}

const ReadingChallengeCard: React.FC<ReadingChallengeCardProps> = ({ borrowedBooksCount }) => {
  const monthlyGoal = 5; // Books per month
  const progress = Math.min(borrowedBooksCount / monthlyGoal, 1);
  const progressPercentage = Math.round(progress * 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="emoji-events" size={24} color={colors.secondary} />
        <Text style={styles.title}>Monthly Reading Challenge</Text>
      </View>
      
      <Text style={styles.description}>
        Read {monthlyGoal} books this month to complete the challenge!
      </Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {borrowedBooksCount}/{monthlyGoal} books
        </Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{borrowedBooksCount}</Text>
          <Text style={styles.statLabel}>Books Read</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{progressPercentage}%</Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{monthlyGoal - borrowedBooksCount}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
      </View>
      
      {progress >= 1 ? (
        <View style={[globalStyles.button, globalStyles.successButton]}>
          <Text style={globalStyles.buttonText}>🎉 Challenge Complete!</Text>
        </View>
      ) : (
        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>Find More Books</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReadingChallengeCard;
