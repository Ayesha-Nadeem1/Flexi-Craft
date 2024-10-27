import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sclogo from "../assets/scLogo.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email:'',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // Navigate or handle successful registration
      } else {
        console.error('Registration failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen text-neutral-900">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        <div className='flex justify-center items-center'>
          <img className="h-10 w-10 justify-center mb-2" src={sclogo} alt="Logo" />
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up to <span className='text-transparent tracking-tight bg-gradient-to-r from-purple-500 to-purple-950 bg-clip-text'>FlexiCraft</span></h2>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-2 mb-4 border rounded bg-neutral-200"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded bg-neutral-200"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded bg-neutral-200"
          required
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 mb-4 border rounded bg-neutral-200"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 mb-4 border rounded bg-neutral-200"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
        <p className="mt-4 text-center">
          Already have an account? <span onClick={() => navigate('/login')} className="text-blue-500 cursor-pointer">Log In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
