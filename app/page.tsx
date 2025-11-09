"use client";
import { useAuth0 } from "@auth0/auth0-react";

import { Shield, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    router.push("/profile");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  SecureAuth
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => loginWithRedirect()}
                className="text-blue-600 bg-blue-50 px-4 py-2 rounded cursor-pointer w-fit"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Secure Multi-Device
            <span className="text-blue-600 block">Authentication</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience next-generation security with our N-device limit system.
            Stay protected while maintaining seamless access across your trusted
            devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => loginWithRedirect()}
              className="flex items-center w-fit space-x-2 cursor-pointer text-blue-600 bg-blue-50 px-4 py-2 rounded"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
