import api from './index';

export const login = async (credentials) => {
  try {

    const response = await api.post('/auth/login' , {email: credentials.email, password: credentials.password});
    return response.data;
    } catch (error) {
    throw error;
    }
}

export const signUp = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
