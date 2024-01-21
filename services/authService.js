import * as authApi from '../api/authApi';

export const authenticateUser = async (credentials) => {
  try {
    const user = await authApi.login(credentials);
    return user;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const user = await authApi.signUp(userData);
    // Save user data to AsyncStorage or secure storage
    return user;
  } catch (error) {
    throw error;
  }
};
