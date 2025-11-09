# SecureAuth - N-Device Authentication System

A modern web application built with Next.js, Express.js, MongoDB, and Auth0 that implements secure N-device session management. Users can only be logged in on a maximum of 3 devices simultaneously, with graceful handling when the limit is exceeded.

## Features

- **N-Device Limit Control**: Maximum 3 concurrent device sessions per user
- **Graceful Device Management**: Users can choose which device to logout when limit is exceeded
- **Modern UI**: Professional, responsive design with Tailwind CSS
- **Phone Number Collection**: Secure storage and management of user contact information
- **Real-time Session Monitoring**: Automatic device tracking and session validation
- **Auth0 Integration**: Enterprise-grade authentication and authorization

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling framework
- **Auth0 React SDK** - Authentication integration
- **Lucide React** - Modern icon library

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database for session storage
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   Express API   │    │    MongoDB      │
│                 │    │                 │    │                 │
│ • Auth0 Login   │◄──►│ • Session Mgmt  │◄──►│ • User Sessions │
│ • Device UI     │    │ • Device Limit  │    │ • Device Data   │
│ • Profile Page  │    │ • Phone Storage │    │ • Phone Numbers │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance)
- Auth0 account and application

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lv-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # Auth0 Configuration
   NEXT_PUBLIC_AUTH0_DOMAIN=your-domain.auth0.com
   NEXT_PUBLIC_AUTH0_CLIENT_ID=your-client-id
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/auth-sessions
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env.local
   ```

5. **Run the application**
   ```bash
   # Starts both frontend (port 3000) and backend (port 5000)
   npm run dev
   
   # Or run separately:
   npm run client  # Frontend only
   npm run server  # Backend only
   ```

### Auth0 Setup

1. Create an Auth0 application (Single Page Application)
2. Configure allowed callback URLs: `http://localhost:3000/profile`
3. Configure allowed logout URLs: `http://localhost:3000`
4. Configure allowed web origins: `http://localhost:3000`

## API Endpoints

### Session Management

- `POST /api/sessions/check` - Check device limit and session validity
- `POST /api/sessions/force-logout` - Force logout a specific device
- `POST /api/sessions/logout` - Logout current device
- `GET /api/sessions/user/:userId` - Get user session data
- `POST /api/sessions/phone` - Update user phone number
- `GET /api/health` - Health check endpoint

### Request/Response Examples

**Check Session:**
```javascript
POST /api/sessions/check
{
  "userId": "auth0|123456789",
  "email": "user@example.com",
  "name": "John Doe",
  "deviceId": "device_abc123"
}
```

**Response (Success):**
```javascript
{
  "success": true,
  "action": "allow",
  "deviceId": "device_abc123",
  "message": "Device added successfully"
}
```

**Response (Limit Exceeded):**
```javascript
{
  "success": false,
  "action": "choose_device",
  "devices": [
    {
      "deviceId": "device_xyz789",
      "deviceName": "iPhone",
      "loginTime": "2024-11-08T10:30:00Z",
      "lastActive": "2024-11-08T11:45:00Z"
    }
  ],
  "message": "Maximum 3 devices allowed. Please choose a device to log out."
}
```

## Database Schema

### UserSession Collection

```javascript
{
  userId: String,        // Auth0 user ID
  email: String,         // User email
  name: String,          // User full name
  phoneNumber: String,   // User phone number
  devices: [             // Array of device sessions
    {
      deviceId: String,
      deviceName: String,
      userAgent: String,
      ipAddress: String,
      loginTime: Date,
      lastActive: Date
    }
  ],
  maxDevices: Number,    // Device limit (default: 3)
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features Implementation

### N-Device Limit System

1. **Device Fingerprinting**: Unique device IDs generated from user agent and timestamp
2. **Session Validation**: Real-time checking against MongoDB records
3. **Graceful Overflow**: User-friendly device selection when limit exceeded
4. **Automatic Cleanup**: Inactive sessions can be managed through database TTL

### Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for specific origins
- **Helmet Security**: Standard security headers
- **Input Validation**: Request body validation and sanitization
- **Error Handling**: Comprehensive error responses without sensitive data exposure

## Deployment

### Frontend (Vercel/Netlify)

1. Build the Next.js application:
   ```bash
   npm run build
   ```

2. Deploy to your preferred platform with environment variables

### Backend (Railway/Heroku/DigitalOcean)

1. Ensure MongoDB connection string is configured
2. Set production environment variables
3. Deploy Express server with process manager (PM2)

### Database (MongoDB Atlas)

1. Create MongoDB Atlas cluster
2. Configure network access and database users
3. Update connection string in production environment

## Testing

### Manual Testing Scenarios

1. **Single Device Login**: Verify normal authentication flow
2. **Multiple Device Login**: Test up to 3 concurrent devices
3. **Device Limit Exceeded**: Test device selection modal
4. **Force Logout**: Verify device removal and session cleanup
5. **Phone Number Management**: Test phone number storage and updates

### Load Testing

Use tools like Artillery or k6 to test API endpoints under load:

```bash
# Example load test
artillery quick --count 10 --num 100 http://localhost:5000/api/health
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Verify MongoDB is running
   - Check connection string format
   - Ensure network connectivity

2. **Auth0 Authentication Issues**
   - Verify domain and client ID
   - Check callback URLs configuration
   - Ensure HTTPS in production

3. **CORS Errors**
   - Update allowed origins in server configuration
   - Verify frontend and backend URLs match

4. **Device Limit Not Working**
   - Check MongoDB document structure
   - Verify API endpoint responses
   - Test device ID generation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review Auth0 and MongoDB documentation
