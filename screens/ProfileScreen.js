import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
  import { useAuth } from '../AuthContext';
  import { removeUser } from '../services/userService';
  import { FIREBASE_AUTH } from '../firebaseConfig';


  
const ProfileScreen = ({ navigation }) => {
  const { user } = useAuth();


  const handleLogoutPress = async () => {
    await removeUser();
    FIREBASE_AUTH.signOut();
    navigation.navigate('Login');
  };
  const name = user.displayName || "_"
  const email = user.email;
  return (
    <View style={styles.container}>
      <Image source={user.profileImage} style={styles.profileImage} />
      <Text style={styles.userName}>{`${name}`}</Text>
      <Text style={styles.userEmail}>{`${email}`}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 20,
    color: '#777',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
