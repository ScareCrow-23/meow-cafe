// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    reservations: 0,
    orders: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch counts from APIs
  const fetchCounts = async () => {
    try {
      const [resReservations, resOrders, resContacts] = await Promise.all([
        fetch("/api/reservations"),
        fetch("/api/orders"),
        fetch("/api/contact"),
      ]);

      const reservationsData = await resReservations.json();
      const ordersData = await resOrders.json();
      const contactsData = await resContacts.json();

      setCounts({
        reservations: reservationsData.data?.length || 0,
        orders: ordersData.data?.length || 0,
        contacts: contactsData.data?.length || 0,
      });
    } catch (err) {
      console.error("Error fetching dashboard counts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="text-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Dashboard Overview</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium">Total Reservations</h2>
            <p className="mt-2 text-2xl font-bold text-blue-400">
              {counts.reservations}
            </p>
          </div>

          <div className="bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium">Total Orders</h2>
            <p className="mt-2 text-2xl font-bold text-green-400">
              {counts.orders}
            </p>
          </div>

          <div className="bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium">Messages</h2>
            <p className="mt-2 text-2xl font-bold text-red-400">
              {counts.contacts}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
