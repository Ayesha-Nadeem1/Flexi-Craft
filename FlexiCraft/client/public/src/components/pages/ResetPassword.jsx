// src/pages/ResetPassword.jsx
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import sclogo from '../../assets/scLogo.png'

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/reset-password/${token}`, {
        password,
        confirmPassword
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-neutral-900">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md p-8 bg-white rounded-md shadow-md'>
      <div className='flex flex-row justify-center items-center'>
          <img className="h-10 w-10 justify-center mb-2" src={sclogo} alt="Logo" />
          <h1 className='text-xl font-semibold text-transparent tracking-tight bg-gradient-to-r from-purple-500 to-purple-950 bg-clip-text'>FlexiCraft</h1>
        </div>
        <h2 className="text-2xl font-thinbold mb-6 text-center">Reset Password </h2>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-2 mb-4 border rounded bg-neutral-200"
            required
          />
        </label>
        <br />
        <label>
          Confirm New Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder=" Confirm New Password"
            className="w-full p-2 mb-4 border rounded bg-neutral-200"
            required
          />
        </label>
        <br />
        <div className='flex flex-col justify-center'>
        <button type="submit" className=" p-2 bg-blue-500 text-white rounded">Reset Password</button>
        {message && <p>{message}</p>}
        </div>
        
      </form>
      
    </div>
  );
};

export default ResetPassword;
