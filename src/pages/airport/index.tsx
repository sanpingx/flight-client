import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/common/Header';
import Button from '@components/ui/Button';
import InputField from '@components//ui/InputField';
import { LoginFormData } from '@/types';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    usernameOrEmail: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
    // Here you would typically call an authentication API
  };

  const handleForgotCredentials = () => {
    console.log('Forgot credentials clicked');
    // Navigate to password recovery page
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />

      <div className="max-w-[540px] mx-auto px-4 pt-14 pb-10">
        <h1 className="text-[28px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-center mb-6">
          Welcome back
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <InputField
            label="Username or email"
            placeholder="Enter your username or email"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleInputChange}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <button
            type="button"
            onClick={handleForgotCredentials}
            className="text-[14px] font-normal text-[#6b7782] font-['Plus_Jakarta_Sans'] text-left mt-2"
          >
            Forgot username or password?
          </button>

          <Button type="submit" fullWidth>
            Log in
          </Button>

          <p className="text-[14px] font-normal text-[#6b7782] font-['Plus_Jakarta_Sans'] text-center mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#6b7782]">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
