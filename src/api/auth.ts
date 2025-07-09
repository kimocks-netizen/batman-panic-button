import api from './index';

export interface LoginResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    api_access_token: string;
  };
}

export const login = async (email: string, password: string): Promise<string> => {
  const response = await api.post<LoginResponse>('/login', {
    email,
    password
  });
  
  if (response.data.status === 'success') {
    return response.data.data.api_access_token;
  }
  throw new Error(response.data.message);
};