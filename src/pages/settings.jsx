import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  UserIcon,
  MoonIcon,
  LanguageIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  // State for settings
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [partnershipUpdates, setPartnershipUpdates] = useState(true);
  const [language, setLanguage] = useState("English");
  const [dataSharing, setDataSharing] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const navigate = useNavigate();

  // Toggle function for switches
  const toggleSwitch = (setter) => (value) => setter(value);

  // Function to render the settings tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              General Settings
            </h3>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <MoonIcon className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                  <p className="text-xs text-gray-500">
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onChange={toggleSwitch(setDarkMode)}
                className={`${
                  darkMode ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer`}
              >
                <span className="sr-only">Enable Dark Mode</span>
                <span
                  className={`${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <LanguageIcon className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Language</p>
                  <p className="text-xs text-gray-500">
                    Select your preferred language
                  </p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm cursor-pointer"
              >
                <option>English</option>
                <option>Amharic</option>
                <option>French</option>
                <option>Arabic</option>
              </select>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Notification Settings
            </h3>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <BellIcon className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
              </div>
              <Switch
                checked={emailNotifications}
                onChange={toggleSwitch(setEmailNotifications)}
                className={`${
                  emailNotifications ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable Email Notifications</span>
                <span
                  className={`${
                    emailNotifications ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition cursor-pointer`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <BellIcon className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    System Notifications
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive notifications within the system
                  </p>
                </div>
              </div>
              <Switch
                checked={systemNotifications}
                onChange={toggleSwitch(setSystemNotifications)}
                className={`${
                  systemNotifications ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer`}
              >
                <span className="sr-only">Enable System Notifications</span>
                <span
                  className={`${
                    systemNotifications ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <BellIcon className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Partnership Updates
                  </p>
                  <p className="text-xs text-gray-500">
                    Get notified about partnership changes
                  </p>
                </div>
              </div>
              <Switch
                checked={partnershipUpdates}
                onChange={toggleSwitch(setPartnershipUpdates)}
                className={`${
                  partnershipUpdates ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer`}
              >
                <span className="sr-only">Enable Partnership Updates</span>
                <span
                  className={`${
                    partnershipUpdates ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        );
      case "privacy":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Privacy Settings
            </h3>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Data Sharing
                  </p>
                  <p className="text-xs text-gray-500">
                    Allow sharing of non-sensitive data for system improvements
                  </p>
                </div>
              </div>
              <Switch
                checked={dataSharing}
                onChange={toggleSwitch(setDataSharing)}
                className={`${
                  dataSharing ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer`}
              >
                <span className="sr-only">Enable Data Sharing</span>
                <span
                  className={`${
                    dataSharing ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        );
      case "account":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Account Settings
            </h3>

            <div className="py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <UserIcon className="h-6 w-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Account Information
                  </p>
                  <p className="text-xs text-gray-500">
                    Manage your account details
                  </p>
                </div>
              </div>
              <div className="ml-9 space-y-3">
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                  onClick={() => navigate("/reset-password")}
                >
                  Change Password
                </button>
                <button className="block text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                  Update Email Address
                </button>
              </div>
            </div>

            <div className="py-4">
              <div className="flex items-center space-x-3 mb-4">
                <TrashIcon className="h-6 w-6 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Delete Account
                  </p>
                  <p className="text-xs text-gray-500">
                    Permanently delete your account and all data
                  </p>
                </div>
              </div>
              <div className="ml-9">
                <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <NavBar />

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b border-gray-200">
              {/* Settings Navigation */}
              <div className="w-64 bg-gray-50 p-6 border-r border-gray-200">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("general")}
                    className={`flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === "general"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                    <span>General</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === "notifications"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <BellIcon className="h-5 w-5" />
                    <span>Notifications</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("privacy")}
                    className={`flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === "privacy"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ShieldCheckIcon className="h-5 w-5" />
                    <span>Privacy</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("account")}
                    className={`flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === "account"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Account</span>
                  </button>
                </nav>
              </div>

              {/* Settings Content */}
              <div className="flex-1 p-6">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
