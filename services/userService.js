
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

const getUser = async () => {
  try {
    const userString = await AsyncStorage.getItem('user');
    return JSON.parse(userString);
  } catch (error) {
    console.error('Error getting user:', error);
  }
};

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.error('Error removing user:', error);
  }
}

export { saveUser, getUser,removeUser };
