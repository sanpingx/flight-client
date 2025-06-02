import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/common/Header';
import Button from '@components/ui/Button';
import InputField from '@components/ui/InputField';
import { RegisterFormData } from '@types/Register';
import * as api from '@/api'
import toast from '@config/toast'

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: '',
    phone: '',
    region: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
    api.register(formData);
    toast.success("注册成功");
    // Here you would typically call an authentication API
  };

  const handleForgotCredentials = () => {
    console.log('Forgot credentials clicked');
    // Navigate to password recovery page
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header 
        bookIsDisplay={false}
        manageIsDisplay={false}
        loginIsDisplay={false}
      />
      
      <div className="max-w-[540px] mx-auto px-4 pt-14 pb-10">
        <h1 className="text-[28px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-center mb-6">
          Create your account
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <InputField 
            label="Email address"
            placeholder="Enter your email address"
            name="email"
            value={formData.email}
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

          <InputField 
            label="First name"
            placeholder="Enter your first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />

          <InputField 
            label="Last name"
            placeholder="Enter your last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          
          <InputField 
            label="Country"
            placeholder="Enter your country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />

          <InputField 
            label="Region"
            placeholder="Enter your region"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
          />

          <InputField 
            label="Phone number"
            placeholder="Enter your phone number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />

          <button 
            type="button" 
            onClick={handleForgotCredentials}
            className="text-[14px] font-normal text-[#6b7782] font-['Plus_Jakarta_Sans'] text-left mt-2"
          >
            
          </button>
          
          <Button type="submit" fullWidth>
            Register
          </Button>
          
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;