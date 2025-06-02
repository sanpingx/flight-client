import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@components/common/Header';
import Button from '@components/ui/Button';
import InputField from '@components/ui/InputField';
import { SearchFormData } from '@types/Search';
import * as api from '@api';
import toast from '@config/toast';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SearchFormData>({
    flight_id: '',
    flight_number: '',
    departure_airport_id: '',
    destination_airport_id: '',
    department_date: '',
    department_time: '',
    price: '',
    creator: '',
    create_time: '',
    updater: '',
    update_time: '',
    deleted: '',
    tenant_id: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    navigate('/flightList');
  };

  const handleForgotCredentials = () => {
    console.log('Forgot credentials clicked');
    // Navigate to password recovery page
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header loginIsDisplay={false} />

      <div className="max-w-[540px] mx-auto px-4 pt-14 pb-10">

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <InputField
            label="Trip type"
            placeholder=""
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleInputChange}
          />

          <InputField
            label="From"
            placeholder="From"
            name="departmentDateFrom"
            value={formData.departmentDateFrom}
            onChange={handleInputChange}
          />

          <InputField
            label="To"
            placeholder="To"
            name="departmentDateTo"
            value={formData.departmentDateTo}
            onChange={handleInputChange}
          />

          <InputField
            label="departure"
            placeholder="departure"
            name="departureAirportId"
            value={formData.departureAirportId}
            onChange={handleInputChange}
          />

          <InputField
            label="Return"
            placeholder="Return"
            name="destinationAirportId"
            value={formData.destinationAirportId}
            onChange={handleInputChange}
          />

          <InputField
            label="passengers"
            placeholder=""
            name="passenger"
            value={formData.passenger}
            onChange={handleInputChange}
          />

          <button
            type="button"
            onClick={handleForgotCredentials}
            className="text-[14px] font-normal text-[#6b7782] font-['Plus_Jakarta_Sans'] text-left mt-2"
          ></button>

          <Button type="submit" fullWidth>
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
