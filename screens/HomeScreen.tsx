import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavProp>();

  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate('AuthScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Freshify 👋</Text>
      <Text style={styles.subtitle}>
        Your smart fridge assistant to reduce food waste and discover recipes!
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fridge Inventory</Text>
        <Button title="View Items" onPress={() => { /* Navigate to fridge screen */ }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Recipes</Text>
        <Button title="Get Suggestions" onPress={() => { /* Navigate to recipe screen */ }} />
      </View>

      <Button title="Log Out" color="#FF5252" onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  section: {
    width: '100%',
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f1f1f1',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
  },
});
