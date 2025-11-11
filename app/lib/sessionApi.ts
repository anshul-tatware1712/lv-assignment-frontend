
export interface UserProfile {
  userId: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  devices?: Device[];
}

export interface Device {
  deviceId: string;
  deviceName: string;
}

export interface ApiResponse<T = UserProfile> {
  success: boolean;
  message: string;
  user?: T;
  requiresProfile?: boolean;
  deviceLoggedOut?: Device;
}

class SessionAPI {
  private baseUrl = '/api';

  async checkProfile(userId: string): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await fetch(`${this.baseUrl}/profile?userId=${encodeURIComponent(userId)}`);
      return await response.json();
    } catch (error) {
      console.error('Profile check error:', error);
      return {
        success: false,
        message: 'Failed to check profile',
        requiresProfile: true
      };
    }
  }

  async login(userId: string, email: string, name: string, deviceId: string, deviceName: string): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await fetch(`${this.baseUrl}/User`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email,
          name,
          deviceId,
          deviceName
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed'
      };
    }
  }

  async updateProfile(userId: string, name: string, phoneNumber: string): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await fetch(`${this.baseUrl}/User/UpdateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          name,
          phoneNumber
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        message: 'Failed to update profile'
      };
    }
  }

  async logout(userId: string): Promise<void> {
    try {
      console.log('Logging out user:', userId);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}

export const sessionAPI = new SessionAPI();
