import React, { useState } from "react";
import { BellIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import NavBar from "../components/NavBar";

const Notifications = () => {
  // Mock notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Partnership Request",
      description: "Turkish Foundation has requested a new partnership",
      timestamp: "2023-06-15T10:30:00",
      read: false,
      type: "partnership",
    },
    {
      id: 2,
      title: "Partnership Expiring Soon",
      description: "The partnership with Civil Society will expire in 30 days",
      timestamp: "2023-06-14T09:15:00",
      read: true,
      type: "alert",
    },
    {
      id: 3,
      title: "User Account Created",
      description: "A new user account has been created for David Kim",
      timestamp: "2023-06-13T14:45:00",
      read: false,
      type: "system",
    },
    {
      id: 4,
      title: "System Maintenance",
      description: "The system will undergo maintenance on June 20, 2023",
      timestamp: "2023-06-12T11:20:00",
      read: true,
      type: "system",
    },
    {
      id: 5,
      title: "Partnership Updated",
      description:
        "The partnership with Ministry of Education has been updated",
      timestamp: "2023-06-11T16:30:00",
      read: false,
      type: "partnership",
    },
  ]);

  // Filter state
  const [filter, setFilter] = useState("all");

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Filter notifications
  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
      ? notifications.filter((notification) => !notification.read)
      : notifications.filter((notification) => notification.type === filter);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <NavBar />

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Mark all as read
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === "all"
                  ? "bg-[#004165] text-white"
                  : "bg-white text-gray-700"
              } cursor-pointer`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === "unread"
                  ? "bg-[#004165] text-white"
                  : "bg-white text-gray-700"
              } cursor-pointer`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter("partnership")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === "partnership"
                  ? "bg-[#004165] text-white"
                  : "bg-white text-gray-700"
              } cursor-pointer`}
            >
              Partnerships
            </button>
            <button
              onClick={() => setFilter("system")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === "system"
                  ? "bg-[#004165] text-white"
                  : "bg-white text-gray-700"
              } cursor-pointer`}
            >
              System
            </button>
            <button
              onClick={() => setFilter("alert")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === "alert"
                  ? "bg-[#004165] text-white"
                  : "bg-white text-gray-700"
              } cursor-pointer`}
            >
              Alerts
            </button>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <BellIcon className="h-12 w-12 mx-auto text-gray-800 mb-4" />
                <p>No notifications to display</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            !notification.read
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <BellIcon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-sm font-medium ${
                              !notification.read
                                ? "text-blue-900"
                                : "text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(notification.timestamp)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.description}
                        </p>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="mt-2 flex items-center text-xs text-blue-600 hover:text-blue-800"
                          >
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Notification Settings Link */}
          <div className="mt-6 text-center">
            <a
              href="/settings"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Manage notification settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
