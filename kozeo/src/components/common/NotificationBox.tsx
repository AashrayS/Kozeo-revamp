"use client";

import { useState, useEffect } from "react";
import {
  FiX,
  FiBell,
  FiCheck,
  FiInfo,
  FiAlertTriangle,
  FiClock,
} from "react-icons/fi";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Gig Completed",
    message:
      "Your WebRTC Voice+Video Chat gig has been successfully completed!",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "info",
    title: "New Collaboration Request",
    message: "John Doe wants to collaborate on your Tldraw Whiteboard project.",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Payment Pending",
    message: "Your payment for MemoLens project is pending verification.",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "info",
    title: "Profile Updated",
    message: "Your profile information has been successfully updated.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "5",
    type: "success",
    title: "New Achievement Unlocked",
    message: "You've earned a new CodeChef certification badge!",
    timestamp: "3 days ago",
    read: true,
  },
];

const NotificationBox = ({ isOpen, onClose }: NotificationBoxProps) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <FiCheck className="text-emerald-400" />;
      case "warning":
        return <FiAlertTriangle className="text-yellow-400" />;
      case "error":
        return <FiX className="text-red-400" />;
      default:
        return <FiInfo className="text-cyan-400" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Notification Box */}
      <div className="fixed top-4 right-4 z-50 w-full max-w-sm md:max-w-md lg:max-w-lg">
        <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-xl shadow-2xl border border-neutral-700 max-h-[80vh] flex flex-col animate-slideDown">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-700">
            <div className="flex items-center gap-3">
              <FiBell className="text-cyan-400 text-xl" />
              <h2 className="text-xl font-semibold text-white">
                Notifications
              </h2>
              {unreadCount > 0 && (
                <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FiBell className="text-gray-500 text-4xl mb-4" />
                <p className="text-gray-400 text-lg">No notifications</p>
                <p className="text-gray-500 text-sm mt-1">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 cursor-pointer transition-colors hover:bg-neutral-800 hover:bg-opacity-30 ${
                      notification.read
                        ? "border-gray-600 bg-opacity-20"
                        : "border-cyan-400 bg-cyan-500 bg-opacity-10"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3
                            className={`text-sm font-medium ${
                              notification.read ? "text-gray-300" : "text-white"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <p
                          className={`text-sm leading-relaxed ${
                            notification.read
                              ? "text-gray-400"
                              : "text-gray-200"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                          <FiClock className="text-xs" />
                          <span>{notification.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-700 p-4">
            <button className="w-full py-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationBox;
