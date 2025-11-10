"use client";
import { Device } from "@/app/lib/apiUtils";
import { X, Smartphone, Monitor, Tablet } from "lucide-react";

interface DeviceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices: Device[];
  onDeviceSelect: (deviceId: string) => void;
  isLoading?: boolean;
}

const DeviceSelectionModal = ({
  isOpen,
  onClose,
  devices,
  onDeviceSelect,
  isLoading = false,
}: DeviceSelectionModalProps) => {
  if (!isOpen) return null;

  const getDeviceIcon = (deviceName: string) => {
    const name = deviceName.toLowerCase();
    if (name.includes("phone") || name.includes("mobile")) {
      return <Smartphone className="w-6 h-6 text-blue-600" />;
    }
    if (name.includes("tablet") || name.includes("ipad")) {
      return <Tablet className="w-6 h-6 text-blue-600" />;
    }
    return <Monitor className="w-6 h-6 text-blue-600" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Device Limit Reached
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">
            You have reached the maximum limit of 3 active devices. Please
            select a device to logout from to continue.
          </p>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {devices
              .filter((device) => device.isActive)
              .map((device) => (
                <div
                  key={device.deviceId}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getDeviceIcon(device.deviceName)}
                      <div>
                        <p className="font-medium text-gray-900">
                          {device.deviceName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Added {formatDate(device.createdAt)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onDeviceSelect(device.deviceId);
                      }}
                      disabled={isLoading}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceSelectionModal;
