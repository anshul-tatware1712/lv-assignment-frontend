"use client";
import { useState } from 'react';
import { X, User, Phone } from 'lucide-react';

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName?: string | null;
  currentPhone?: string | null;
  onUpdate: (name: string, phone: string) => Promise<void>;
  isLoading?: boolean;
}

const UpdateProfileModal = ({ 
  isOpen, 
  onClose, 
  currentName, 
  currentPhone, 
  onUpdate, 
  isLoading = false 
}: UpdateProfileModalProps) => {
  const [name, setName] = useState(currentName || '');
  const [phone, setPhone] = useState(currentPhone || '');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(name, phone);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Update Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 text-black">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </div>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </div>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your phone number"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
