import UserSession from '../models/UserSession.js';

// Middleware to check if user exists and has required details
export const checkUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }

    const user = await UserSession.findOne({ userId });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found',
        requiresProfile: true 
      });
    }

    // Check if user has name and phone number
    if (!user.name || !user.phoneNumber) {
      return res.status(200).json({ 
        success: false, 
        message: 'Profile incomplete',
        requiresProfile: true,
        user: {
          userId: user.userId,
          email: user.email,
          name: user.name || '',
          phoneNumber: user.phoneNumber || ''
        }
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Middleware for device management
export const manageDevices = async (req, res, next) => {
  try {
    const { userId, deviceId, deviceName } = req.body;
    
    if (!deviceId || !deviceName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Device ID and name are required' 
      });
    }

    let user = await UserSession.findOne({ userId });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if device already exists
    const existingDeviceIndex = user.devices.findIndex(device => device.deviceId === deviceId);
    
    if (existingDeviceIndex !== -1) {
      // Device already exists, update timestamp
      user.devices[existingDeviceIndex].deviceName = deviceName;
      await user.save();
      req.user = user;
      return next();
    }

    // Check if user has reached max devices limit
    if (user.devices.length >= user.maxDevices) {
      // Remove the oldest device (first in array)
      const removedDevice = user.devices.shift();
      user.devices.push({ deviceId, deviceName });
      await user.save();
      
      req.user = user;
      req.deviceLoggedOut = removedDevice;
      return next();
    }

    // Add new device
    user.devices.push({ deviceId, deviceName });
    await user.save();
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Device management error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
