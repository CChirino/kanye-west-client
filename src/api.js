import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const getToken = () => {
    return localStorage.getItem('token');
  };
  
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
    try {
      const response = await api.post('/login', {
        email: email,
        password: password,
      });
      return response.data.data.token;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data.token;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await api.get('/profile/show');
    return response.data.data.name;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const fetchQuotes = async () => {
  try {
    const response = await api.get('/quote/show');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

export const fetchNumberQuotes = async (number) => {
  try {
    const response = await api.get(`/quote/number-quotes?number=${number}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const addToFavorites = async (quoteId) => {
  try {
    const response = await api.post('/favorite/store', { quote: quoteId });
    console.log('Favorite quote added:', response.data.data);
  } catch (error) {
    console.error('Error adding quote to favorites:', error);
    throw error;
  }
};

export const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorite/index');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  };
  
export const deleteFavorite = async (favoriteId) => {
    try {
      await api.delete(`/favorite/delete/${favoriteId}`);
    } catch (error) {
      console.error('Error deleting favorite quote:', error);
      throw error;
    }
};

export const fetchUserProfile = async () => {
    try {
      const response = await api.get('/profile/show');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
};
  
export const updateProfile = async (data) => {
    try {
      const response = await api.post('/profile/update', data);
      return response.data.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
};