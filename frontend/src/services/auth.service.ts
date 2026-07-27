import api from './api';
import type { ApiResponse, AuthResponse, AuthUser } from '../types/api';

export const authService = {
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const res = await api.post<ApiResponse<AuthResponse>>('/auth/register', {
      name,
      email,
      password,
    });
    const data = res.data.data;
    if (data?.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await api.post<ApiResponse<AuthResponse>>('/auth/login', { email, password });
    const data = res.data.data;
    if (data?.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    return data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
    }
  },

  async getMe(): Promise<AuthUser> {
    const res = await api.get<ApiResponse<AuthUser>>('/users/me');
    return res.data.data;
  },
};
