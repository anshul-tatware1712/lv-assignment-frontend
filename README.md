# Multi-Device Authentication Frontend

A modern Next.js frontend application that provides secure multi-device authentication with session management. Built with TypeScript, Tailwind CSS, and Auth0 integration.

## 🚀 Features

- **Multi-Device Session Management**: Handle authentication across multiple devices
- **Real-time Session Validation**: Automatic session checking every 60 seconds
- **Cross-Device Logout Detection**: Immediate notification when logged out from another device
- **Profile Management**: Update user profile information including phone numbers
- **Modern UI/UX**: Responsive design with Tailwind CSS and Lucide icons
- **Auth0 Integration**: Enterprise-grade authentication

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Auth0 React SDK** - Authentication provider
- **Lucide React** - Modern icon library

## 📁 Project Structure

```
app/
├── components/
│   ├── Profile/
│   │   └── Profile.tsx          # Main profile component
│   ├── LoggedOutModal.tsx       # Session expired modal
│   ├── UpdateProfileModal.tsx   # Profile update modal
│   ├── AuthProvider.tsx         # Auth0 provider wrapper
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── apiUtils.ts             # API utility functions
│   ├── deviceUtils.ts          # Device fingerprinting
│   └── sessionApi.ts           # Session management API
└── Utils/
    └── profile.utils.ts        # Profile utility functions
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Auth0 account and application setup
- Backend API server running

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anshul-tatware1712/lv-assignment-frontend.git
   cd lv-assignment-frontend
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
   
   # Backend API URL
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Auth0 Setup

1. Create an Auth0 Single Page Application
2. Configure the following settings:
   - **Allowed Callback URLs**: `http://localhost:3000/profile`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_AUTH0_DOMAIN` | Your Auth0 domain | ✅ |
| `NEXT_PUBLIC_AUTH0_CLIENT_ID` | Your Auth0 client ID | ✅ |
| `NEXT_PUBLIC_BACKEND_URL` | Backend API base URL | ✅ |

## 🔐 Authentication Flow

1. **Login**: User authenticates via Auth0
2. **Device Registration**: System registers device with unique fingerprint
3. **Session Validation**: Continuous validation every 60 seconds
4. **Multi-Device Handling**: 
   - If logged out from another device, show logged out modal
5. **Profile Management**: Users can update their profile information

## 📱 Key Components

### Profile Component
- Main dashboard displaying user information
- Real-time session monitoring
- Device management interface

### LoggedOutModal
- Triggered when user is logged out from another device
- Provides clear messaging and re-login option
- Prevents further app usage until re-authentication

### UpdateProfileModal
- Form for updating user profile information
- Validates phone number format
- Real-time form validation

## 🔄 Session Management

The application implements robust session management:

- **Periodic Checks**: Validates session every 60 seconds
- **Visibility Detection**: Checks session when user returns to tab
- **Focus Events**: Validates session when window gains focus
- **Error Handling**: Graceful handling of network errors and session timeouts

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Loading States**: Smooth loading indicators during API calls
- **Error Handling**: User-friendly error messages
- **Modern Icons**: Lucide React icons throughout the interface
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify

1. Build the application: `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🔍 API Integration

The frontend communicates with the backend through these main endpoints:

- `GET /api/user` - Fetch user profile and devices
- `POST /api/user/update` - Update user profile
- `POST /api/user/logout` - Logout specific device

## 🐛 Troubleshooting

### Common Issues

1. **Auth0 Configuration Errors**
   - Verify domain and client ID
   - Check callback URLs
   - Ensure environment variables are set

2. **API Connection Issues**
   - Verify backend server is running
   - Check CORS configuration
   - Validate API endpoint URLs

3. **Session Management Issues**
   - Check browser console for errors
   - Verify device fingerprinting is working
   - Test with multiple browser tabs/devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review Auth0 documentation

---

Built with ❤️ using Next.js and TypeScript