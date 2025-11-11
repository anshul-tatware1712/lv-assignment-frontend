"use client";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import { User, LogOut, Phone, AlertCircle } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { getDeviceInfo } from "@/app/lib/deviceUtils";
import {
  getUser,
  updateUser,
  logoutDevice,
  User as BackendUser,
} from "@/app/lib/apiUtils";
import UpdateProfileModal from "@/app/Components/UpdateProfileModal";
import LoggedOutModal from "@/app/Components/LoggedOutModal";
import Loader from "../Loader";

const Profile = () => {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading: auth0Loading,
    logout,
  } = useAuth0();

  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showLoggedOutModal, setShowLoggedOutModal] = useState(false);
  const isLoggingOut = useRef(false);

  const fetchUserData = useCallback(async () => {
    if (!auth0User?.email || isLoggingOut.current) return;

    try {
      setIsLoading(true);
      setError(null);

      const { deviceId, deviceName } = getDeviceInfo();
      const response = await getUser(auth0User.email, deviceId, deviceName);

      if (response.success && response.user) {
        setBackendUser(response.user);
      } else if (response.errorCode === 403) {
        setBackendUser(response?.user || null);
        setError(response.message);
      } else if (response.errorCode === 400) {
        setShowLoggedOutModal(true);
      } else {
        setError(response.message || "Failed to fetch user data");
      }
    } catch (err) {
      if (!isLoggingOut.current) {
        setError("Network error occurred");
        console.error("Error fetching user:", err);
      }
    } finally {
      if (!isLoggingOut.current) {
        setIsLoading(false);
      }
    }
  }, [auth0User?.email]);

  useEffect(() => {
    if (auth0Loading) return;

    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    if (auth0User?.email && !isLoggingOut.current) {
      fetchUserData();
    }
  }, [auth0Loading, isAuthenticated, auth0User?.email, fetchUserData]);

  useEffect(() => {
    if (
      !isAuthenticated ||
      !auth0User?.email ||
      showLoggedOutModal ||
      isLoggingOut.current
    )
      return;

    const intervalId = setInterval(() => {
      if (!isLoggingOut.current) {
        fetchUserData();
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, auth0User?.email, showLoggedOutModal, fetchUserData]);

  const handleDeviceLogout = async (deviceId: string) => {
    if (!backendUser) return;

    try {
      setIsLoading(true);
      const response = await logoutDevice(backendUser.userId, deviceId);
      if (response.success) {
        await fetchUserData();
      } else {
        setError(response.message || "Failed to logout device");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Error logging out device:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (name: string, phone: string) => {
    if (!backendUser) return;

    try {
      setIsLoading(true);
      const response = await updateUser(backendUser.userId, name, phone);

      if (response.success && response.user) {
        setBackendUser(response.user);
        setShowUpdateModal(false);
      } else {
        setError(response.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Error updating profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutCurrentDevice = async () => {
    if (!backendUser) return;

    isLoggingOut.current = true;

    const { deviceId } = getDeviceInfo();
    await handleDeviceLogout(deviceId);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleRelogin = () => {
    isLoggingOut.current = true;
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (auth0Loading || isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={auth0User?.picture || ""}
                  alt={auth0User?.name || "User"}
                  width={80}
                  height={80}
                  className="rounded-full border-blue-200"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
                <p className="text-gray-600">Profile Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogoutCurrentDevice}
              className="flex items-center cursor-pointer text-red-600 space-x-2 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Personal Information
              </h2>
            </div>

            <div className="space-y-4 text-black">
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Full Name
                </label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  {backendUser?.name || "Not provided"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-1">
                  Email Address
                </label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  {backendUser?.email || "Not provided"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium  mb-1">
                  Phone Number
                </label>
                <div className="p-3 bg-gray-50 rounded-md border flex items-center space-x-2">
                  <Phone className="w-4 h-4 " />
                  <span>{backendUser?.phoneNumber || "Not provided"}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowUpdateModal(true)}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <UpdateProfileModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        currentName={backendUser?.name}
        currentPhone={backendUser?.phoneNumber}
        onUpdate={handleUpdateProfile}
        isLoading={isLoading}
      />

      <LoggedOutModal isOpen={showLoggedOutModal} onRelogin={handleRelogin} />
    </div>
  );
};

export default Profile;
