import React , { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../AuthContext';
import { getUser } from '../services/userService';

const isUserAuthenticated = async () => {
  

  return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => 
    
    getUser().then((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    })
  );
};

const SplashScreen = () => {
  const navigation = useNavigation();



  useEffect(() => {
    // Simulate loading time or check for user authentication
    const checkAuthentication = async () => {
      // ... check if user is authenticated
      // For simplicity, let's assume there's a function `isUserAuthenticated()` that returns a boolean
      const isAuthenticated = await isUserAuthenticated();

      if (isAuthenticated) {
        navigation.replace('Main');
      } else {
        navigation.replace('Login');
      }
    };

    checkAuthentication();
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <Image source={require('../assets/splash.png')} style={styles.splashLogo} />
    </View>
  );
};
  
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50', // Dark Background
  },
  splashLogo: {
    width: '80%',
    height: '80%',
  },
});


export default SplashScreen;