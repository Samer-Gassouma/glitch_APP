import React, { useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { saveUser } from '../services/userService';
import { FIREBASE_AUTH } from '../firebaseConfig';
import {  createUserWithEmailAndPassword} from 'firebase/auth';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;





const signUp = async () => {
  try {
    setLoading(true);
    const response = await createUserWithEmailAndPassword(auth, email, password);
    if(response.idToken){
      alert('Sign Up successful', 'Your account has been created successfully.');
      await saveUser(response);
      navigation.navigate('Main');      
      }
  } catch (error) {
    console.log(error);
    alert('Unable to create an account. Please try again.');
  } finally {
    setLoading(false);
  }
};

  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to GLITCH!</Text>
      <Text style={{
        fontSize: 18,
        marginBottom: 16,
        color: '#b8c2cc',
        fontWeight: 'bold',
    }}>
        Sign Up for an account
    </Text>
      <TextInput
        label="email"
        placeholder="Enter your email"
        style={styles.input}
        mode="outlined"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        style={styles.input}
        mode="outlined"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      {loading ? <ActivityIndicator size="large" color="#00ff00" />
      : <>
      <Button mode="contained" style={styles.button} onPress={signUp}>
        Sign Up
      </Button>
      <Button
        mode="text"
        style={styles.linkButton}
        onPress={() => navigation.goBack()}
      >
        Go Back
      </Button>
      
      </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a192f',
    padding: 16,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#b8c2cc',
  },
  input: {
    width: '100%',
    height: 48,
    marginBottom: 16,
    backgroundColor: '#0f2a41', 
    color: '#b8c2cc',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  button: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
});

export default SignUpScreen;
