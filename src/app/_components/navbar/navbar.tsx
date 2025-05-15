"use client";
import { useState, useEffect } from "react";
import { getNotifications } from "@/app/api/notifications";
import NavbarContent from "@/app/_components/navbar/navbar-content";

const Navbar = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const fetch = async () => {
    const notis = await getNotifications();
    setNotifications(notis);
  };

  useEffect(() => {
    fetch();
    const handleRefresh = () => {
      fetch();
    };
    window.addEventListener("refreshNotifications", handleRefresh);

    return () => {
      window.removeEventListener("refreshNotifications", handleRefresh);
    };
  }, []);

  return <NavbarContent notifications={notifications} />;
};

export default Navbar;
