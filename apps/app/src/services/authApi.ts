import { apiService } from './api';

interface ResetPasswordData {
  currentPassword: string;
  newPassword: string;
}

interface DeleteAccountData {
  currentPassword: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordWithTokenData {
  token: string;
  newPassword: string;
}

interface UserStats {
  publishedArticles: number;
  drafts: number;
}

interface AuthResponse {
  success: boolean;
  data: any;
}

class AuthApiService {
  async resetPassword(data: ResetPasswordData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/reset-password', data);
  }

  async deleteAccount(data: DeleteAccountData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/delete-account', data);
  }

  async getUserStats(): Promise<{ success: boolean; data: UserStats }> {
    return apiService.get<{ success: boolean; data: UserStats }>('/auth/stats');
  }

  async forgotPassword(data: ForgotPasswordData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/forgot-password', data);
  }

  async resetPasswordWithToken(data: ResetPasswordWithTokenData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/reset-password-with-token', data);
  }
}

export const authApi = new AuthApiService();
