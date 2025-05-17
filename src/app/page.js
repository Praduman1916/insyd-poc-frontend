

"use client";

import NotificationForm from "@/components/NotificationForm";
import NotificationList from "@/components/NotificationList";
import React, { useState } from "react";

export default function Page() {
  const [newNotification, setNewNotification] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <NotificationForm onNewNotification={setNewNotification} />
      <NotificationList newNotification={newNotification} />
    </div>
  );
}