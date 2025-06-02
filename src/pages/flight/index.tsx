import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '@components/common/Header';
import Button from '@components/ui/Button';
import InputField from '@components/ui/InputField';
import { FlightFormData } from '@types/Flight';
import * as api from '@api';
import toast from '@config/toast';

const FlightPage: React.FC = () => {
  // state 对象包含传递的数据
  let location = useLocation();
  const { state } = location;
  console.log(state); 

  return (
    <div className="w-full min-h-screen bg-white">
      <Header loginIsDisplay={false} />

      <div className="max-w-[540px] mx-auto px-4 pt-14 pb-10">
        <h1 className="text-[28px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-6">
          Review your flights
        </h1>
        <h1 className="text-[20px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-2">
          Outbound
        </h1>
        <h1 className="text-[14px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-1">
          {state && state.flightNumber}&nbsp;&nbsp;({state && state.departureCity}
          &nbsp;&nbsp;to&nbsp;&nbsp;
          {state && state.destinationCity})
        </h1>
        <h1 className="text-[14px] text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-6">
          {state && state.departmentDate}&nbsp;&nbsp;{state && state.departmentTime}~
          {state && state.arrivalTime}
        </h1>
        <h1 className="text-[20px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-6 line-height-[20px]"></h1>
        <h1 className="text-[20px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-6">
          Return
        </h1>
        <h1 className="text-[14px] text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-6">
          &nbsp;&nbsp;
        </h1>
        <h1 className="text-[20px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-1">
          Price
        </h1>
        <h1 className="text-[14px] text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-1">
          ${state && state.price}
        </h1>
      </div>
    </div>
  );
};

export default FlightPage;
