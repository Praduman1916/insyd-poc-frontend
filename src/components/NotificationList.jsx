"use client";

import React, { useEffect, useState, useRef } from "react";
import { FiBell } from "react-icons/fi";
import { getNotifications } from "@/app/api/notificationService";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:9000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default function NotificationList({ newNotification }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetching, setFetching] = useState(false);
  const containerRef = useRef();

  const fetchNotifications = async (pageNum = 1) => {
    try {
      setFetching(true);
      const data = await getNotifications(pageNum, 10);
      setNotifications((prev) => [...prev, ...data.notifications]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchNotifications(page);
  }, [page]);

  useEffect(() => {
    if (newNotification) {
      setNotifications((prev) => [newNotification, ...prev]);
    }
  }, [newNotification]);

  useEffect(() => {
    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => socket.off("notification");
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !fetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, fetching]);

  return (
    <div
      ref={containerRef}
      className="scroll-container bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8  mx-auto my-8 shadow-2xl backdrop-blur-lg"
    >
      <div className="flex items-center mb-6">
        <FiBell className="text-purple-500 text-4xl mr-3 animate-pulse" />
        <h2 className="text-4xl font-bold text-white glow">Notifications</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="bg-gradient-to-r from-gray-800 to-gray-700 border-l-4 border-purple-500 p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-2xl hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-600"
            >
              <p className="text-lg text-gray-200 font-semibold">{notification.message}</p>
              <span className="text-sm text-gray-400">
                {new Date(notification.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-4">No notifications yet.</p>
      )}

      {fetching && !loading && (
        <div className="flex justify-center py-6">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
