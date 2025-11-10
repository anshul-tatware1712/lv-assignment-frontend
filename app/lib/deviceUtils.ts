import { v4 as uuidv4 } from 'uuid';

export function generateDeviceId(): string {
  const existingDeviceId = localStorage.getItem('deviceId');
  
  if (existingDeviceId) {
    return existingDeviceId;
  }
  
  const newDeviceId = uuidv4();
  localStorage.setItem('deviceId', newDeviceId);
  return newDeviceId;
}

export function getDeviceName(): string {
  const userAgent = navigator.userAgent;
  
  if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    if (/iPhone/i.test(userAgent)) return 'iPhone';
    if (/iPad/i.test(userAgent)) return 'iPad';
    if (/Android/i.test(userAgent)) return 'Android Device';
    return 'Mobile Device';
  }
  
  if (/Mac/i.test(userAgent)) return 'Mac';
  if (/Windows/i.test(userAgent)) return 'Windows PC';
  if (/Linux/i.test(userAgent)) return 'Linux PC';
  
  return 'Desktop Browser';
}

export function getDeviceInfo(): { deviceId: string; deviceName: string } {
  return {
    deviceId: generateDeviceId(),
    deviceName: getDeviceName()
  };
}
