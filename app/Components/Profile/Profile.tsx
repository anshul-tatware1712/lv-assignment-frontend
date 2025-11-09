"use client";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import { User, LogOut, Phone, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { Device } from "@/app/lib/sessionApi";
import { useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:5000/api/user?email=${user?.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [isAuthenticated, user?.email]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={user?.picture || ""}
                  alt={user?.name || "User"}
                  width={80}
                  height={80}
                  className="rounded-full  border-blue-200"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
                <p className="text-gray-600">Profile Dashboard</p>
              </div>
            </div>
            <button className="flex items-center cursor-pointer text-red-600 space-x-2">
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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  {user?.name || "Not provided"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  {user?.email || "Not provided"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="p-3 bg-gray-50 rounded-md border flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{user?.phoneNumber || "Not provided"}</span>
                </div>
              </div>
            </div>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Update Profile
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Smartphone className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Active Devices
              </h2>
            </div>

            <div className="space-y-3">
              {user?.devices && user.devices.length > 0 ? (
                user.devices.map((device: Device) => (
                  <div
                    key={device.deviceId}
                    className="p-3 bg-gray-50 rounded-md border flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {device.deviceName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Device ID: {device.deviceId}
                      </p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No active devices</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
