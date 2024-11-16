import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import WithLayout_User from '../shared/Layout';

const Settings = () => {
  const { user, setUser, setProfilePicUrl } = useContext(UserContext); // Access user and setters from context
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      //setPreview(user.profilePic);
      setPreview(`http://localhost:5000/uploads/${user.profilePic}`);
    }
  }, [user]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debug: Check token value
  
      const formData = new FormData();
      formData.append('username', username);
      formData.append('currentPassword', currentPassword);
      formData.append('newPassword', newPassword);
      if (profilePic) formData.append('profilePic', profilePic);
  
      const response = await fetch('http://localhost:5000/api/users/update', {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in header
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
        setProfilePicUrl(data.profilePic);
      } else {
        const errorData = await response.json();
        console.error('Error updating user:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleRemoveProfilePic = async () => {
    try {
      // Get the token from local storage or context
      const token = localStorage.getItem('token'); // Adjust this based on where you store your token
  
      await axios.delete('http://localhost:5000/api/users/profile-pic', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      // Update the state after successful deletion
      setProfilePic(null);
      setPreview(null);
      setProfilePicUrl(null); // Update the profile picture URL in context
    } catch (error) {
      console.error('Error removing profile picture:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-2">
      <h1 className="text-3xl text-neutral-900 font-semibold mb-6 mt-20">Settings</h1>

      <form onSubmit={handleSubmit}>
        {/* Profile Picture */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full border"
              />
              <button type="button" onClick={handleRemoveProfilePic} className="mt-2 text-red-500">Remove</button>
            </div>
          )}
        </div>

        {/* Username */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="bg-indigo-100 text-neutral-900 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            className="bg-indigo-100 text-neutral-900 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className="bg-indigo-100 text-neutral-900 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default WithLayout_User(Settings);
