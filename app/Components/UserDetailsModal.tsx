'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; phoneNumber: string }) => void;
  initialData?: {
    name?: string;
    phoneNumber?: string;
  };
  loading?: boolean;
}

export default function UserDetailsModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  loading = false
}: UserDetailsModalProps) {
  const [name, setName] = useState(initialData.name || '');
  const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber || '');
  const [errors, setErrors] = useState<{ name?: string; phoneNumber?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; phoneNumber?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name: name.trim(),
        phoneNumber: phoneNumber.trim()
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Complete Your Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Please provide your name and phone number to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border text-black! rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
              disabled={loading}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
