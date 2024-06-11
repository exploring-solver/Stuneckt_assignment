"use client"; // This must be the first line in the file

import React, { useEffect, useState } from 'react';

interface User {
  email: string;
  id: string;
  username: string;
  iat: number;
  exp: number;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const response = await fetch(`${process.env.BACKEND_URL}/users/api/v1/user/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          setLoading(false);
        } else {
          console.error('Failed to fetch user details:', data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{user.username}'s Profile</h1>
      <div className="border-t border-gray-200 mt-4 pt-4">
        <p>Email: {user.email}</p>
        <p>User ID: {user.id}</p>
      </div>
      <button onClick={() => window.location.href = '/'} className="mt-8 px-4 py-2 bg-blue-500 text-white rounded">Go to Home</button>
    </div>
  );
};

export default Profile;
