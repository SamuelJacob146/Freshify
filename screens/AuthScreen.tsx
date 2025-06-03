// screens/AuthScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type AuthNavProp = NativeStackNavigationProp<RootStackParamList, 'AuthScreen'>;

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigation = useNavigation<AuthNavProp>();

  const handleAuth = async () => {
    try {
      let userCred;
  
      if (isRegistering) {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registered:', userCred.user.email);
      } else {
        userCred = await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in:', userCred.user.email);
      }
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
  
    } catch (err: any) {
      console.error('Auth error:', err.message);
      alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title={isRegistering ? 'Register' : 'Login'} onPress={handleAuth} />
      <Text onPress={() => setIsRegistering(!isRegistering)} style={styles.toggle}>
        {isRegistering ? 'Already have an account?' : 'New user? Register here'}
      </Text>
      {email && password && (
        <Text style={styles.error}>
          {isRegistering ? 'Please register with a valid email and password.' : 'Please log in with your email and password.'}
        </Text>
      )}
      {email && !password && (
        <Text style={styles.error}>
          {isRegistering ? 'Please register with a password (at least 6 characters).' : 'Please log in with your email and password.'}
        </Text>
      )}
      <Text style={styles.error}>
        {email && !email.includes('@') ? 'Invalid email format.' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  input: { marginBottom: 12, padding: 12, borderWidth: 1, borderRadius: 8 },
  toggle: { color: 'blue', marginTop: 12, textAlign: 'center' },
  error: { color: 'red', marginTop: 12, textAlign: 'center' },
});
