import { Stack } from 'expo-router';
import React from 'react';
import { BookProvider } from '../context/BookContext';

export default function RootLayout() {
  return (
    <BookProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </BookProvider>
  );
}
