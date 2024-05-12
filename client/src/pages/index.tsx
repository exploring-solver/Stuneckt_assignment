import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../utils/auth';
import Posts from '@/components/Posts';

const Home: React.FC = () => {

  const { isAuthenticated, user, token } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  // console.log("Token" ,token)
  const handleToggleForm = () => {
    setIsSigningUp((prevState) => !prevState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${process.env.BACKEND_URL}/users/api/v1/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        emailOrUsername: formData.email,
        password: formData.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } else {
      console.error('Failed');
      alert('An error occurred. Please try again and recheck the details.');
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `${process.env.BACKEND_URL}/users/api/v1/signup`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } else {
      console.error('Failed');
      alert('An error occurred. Please try again and recheck the details.');
    }
  };


  return (
    <Layout>
      {isAuthenticated ? (
        <div className='w-[90%] m-auto'>
          <h1 className="text-xl font-medium text-white border-b-2 w-fit">Welcome, {user?.username}!</h1>
          <br />
          <p className="text-white text-xl">Latest posts(With Pagination):</p>
          <br />
          <Posts />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">

          <h1 className="text-3xl font-bold text-white mb-4">
            {isSigningUp ? 'Sign Up' : 'Sign In'}
          </h1>
          {isSigningUp ? (
            <form className="flex flex-col items-center gap-2" onSubmit={handleSignUp}>
              <input
                className='custom-input'
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className='custom-input'
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />

              <input
                className='custom-input'
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                className='custom-input'
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className='custom-input'
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                className='custom-input'
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
              />
              <button type="submit" className="btn-primary">
                Sign Up
              </button>
            </form>
          ) : (
            <form className="flex flex-col items-center gap-2" onSubmit={handleSignIn}>
              <input
                className='custom-input'
                type="text"
                placeholder="Email or Username"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className='custom-input'
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="submit" className="btn-primary">
                Sign In
              </button>
            </form>
          )}
          <p className="text-white mt-4">
            {isSigningUp ? 'Already have an account?' : 'Don\'t have an account?'}
            <button onClick={handleToggleForm} className="text-blue-500 ml-1">
              {isSigningUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Home;
