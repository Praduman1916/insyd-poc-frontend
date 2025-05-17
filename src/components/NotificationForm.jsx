"use client";

import React, { useState } from "react";
import { addNotification } from "@/app/api/notificationService";
import { io } from "socket.io-client";
import { FiSend } from "react-icons/fi";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:9000", {
    transports: ["websocket"],
    withCredentials: true,
});

export default function NotificationForm({ onNewNotification }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError("Message cannot be empty.");
            return;
        }

        try {
            setLoading(true);
            const newNotification = await addNotification(message);
            socket.emit("new-notification", newNotification);
            onNewNotification(newNotification);
            setMessage("");
            setError("");
        } catch (err) {
            setError("Failed to send notification. Please try again.");
            console.error("Error sending notification:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="sticky-header">
            <div className="flex items-center mb-4">
                <FiSend className="text-primary-color text-2xl mr-2" />
                <h2 className="text-2xl font-bold">Send a Notification</h2>
            </div>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your notification message..."
                className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 
               focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-md"
                disabled={loading}
            />


            {error && <p className="text-red-500 mb-2">{error}</p>}


            <button
                disabled={loading}
                className={`w-full p-3 rounded-lg font-bold text-white bg-purple-600 transition-all duration-300 
        ${loading ? "cursor-not-allowed opacity-60" : "hover:bg-purple-700  shadow-lg"}`}
            >
                {loading ? "Sending..." : "Send Notification"}
            </button>

        </form>
    );
}

