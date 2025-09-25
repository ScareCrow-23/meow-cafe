// app/admin/contact/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Trash2, RefreshCw } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      } else {
        setError(data.error || "Failed to fetch contacts");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(data.error || "Failed to delete contact");
      }
    } catch {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
        <button
          onClick={fetchContacts}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border border-gray-300 text-sm text-gray-800">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="p-3 border border-gray-700">Name</th>
              <th className="p-3 border border-gray-700">Email</th>
              <th className="p-3 border border-gray-700">Message</th>
              <th className="p-3 border border-gray-700">Created At</th>
              <th className="p-3 border border-gray-700 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact, idx) => (
                <tr
                  key={contact._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 border border-gray-300 font-medium">
                    {contact.name}
                  </td>
                  <td className="p-3 border border-gray-300 text-blue-600">
                    {contact.email}
                  </td>
                  <td className="p-3 border border-gray-300 max-w-md truncate">
                    {contact.message}
                  </td>
                  <td className="p-3 border border-gray-300 text-gray-600">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border border-gray-300 text-center">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="p-4 border border-gray-300 text-center"
                  colSpan={5}
                >
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
