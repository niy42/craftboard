import React, { useState } from 'react';
import axios from 'axios';

const InviteForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://craftboard-dep.onrender.com";

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/invite`, { email });
    setEmail('');
    alert('Invitation sent!');
  };

  return (
    <form onSubmit={handleInvite} className="p-4 bg-white shadow-md rounded">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email to invite"
        className="mb-2 p-2 border rounded w-full"
      />
      <button type="submit" className="px-4 py-2 bg-green-700 text-white rounded">
        Send Invite
      </button>
    </form>
  );
};

export default InviteForm;