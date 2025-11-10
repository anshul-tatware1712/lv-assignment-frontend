const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

export interface Device {
  deviceId: string;
  deviceName: string;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  userId: string;
  email: string;
  name: string | null;
  phoneNumber: string | null;
  devices: Device[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  user?: User;
  errorCode?: number;
}

export async function getUser(
  email: string,
  deviceId: string,
  deviceName: string
): Promise<ApiResponse<User>> {
  const response = await fetch(
    `${API_BASE_URL}/user?email=${encodeURIComponent(
      email
    )}&deviceId=${encodeURIComponent(deviceId)}&deviceName=${encodeURIComponent(
      deviceName
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}

export async function updateUser(
  userId: string,
  name?: string,
  phoneNumber?: string
): Promise<ApiResponse<User>> {
  const response = await fetch(`${API_BASE_URL}/user/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      ...(name !== undefined && { name }),
      ...(phoneNumber !== undefined && { phoneNumber }),
    }),
  });

  return response.json();
}

export async function logoutDevice(
  userId: string,
  deviceId: string
): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE_URL}/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      deviceId,
    }),
  });

  return response.json();
}
