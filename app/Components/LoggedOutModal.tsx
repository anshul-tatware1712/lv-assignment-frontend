"use client";
import { AlertCircle, LogOut } from "lucide-react";

interface LoggedOutModalProps {
  isOpen: boolean;
  onRelogin: () => void;
}

const LoggedOutModal = ({ isOpen, onRelogin }: LoggedOutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="shrink-0">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Session Expired
            </h3>
            <p className="text-sm text-gray-600">
              You have been logged out from another device
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            Your session has been terminated because you logged in from another device. 
            Please login again to continue.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onRelogin}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Login Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoggedOutModal;
