import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/common/Header';
import Button from '@components/ui/Button';
import InputField from '@components/ui/InputField';
import { BookFormData } from '@types/Book';
import * as api from '@api';
import toast from '@config/toast';

const BookPage: React.FC = () => {
  const [upcomings, setUpcomings] = useState<BookFormData>([]);
  const [pasts, setPasts] = useState<BookFormData>([]);

  useEffect(() => {
    (async () => {
      // 初始化代码
      const response = await api.getBook();
      const data = await response.list;
      console.log(data);
      setUpcomings(
        data.filter((item: BookFormData) => Date.parse(item.departmentDate) > Date.now())
      );
      setPasts(data.filter((item: BookFormData) => Date.parse(item.departmentDate) <= Date.now()));
    })();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <Header loginIsDisplay={false} />

      <div className="max-w-[540px] mx-auto px-4 pt-14 pb-10">
        <h1 className="text-[28px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-6">
          My Bookings
        </h1>
        <h1 className="text-[20px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-2">
          Upcoming
        </h1>
        {upcomings.map((item: BookFormData) => (
          <>
            <h1 className="text-[14px] text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-1">
              Booking Reference: &nbsp;&nbsp;{item && item.flightNumber}
            </h1>
            <h1 className="text-[14px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-1">
              Departure: &nbsp;&nbsp;(
              {item && item.departureCity}
              &nbsp;&nbsp;to&nbsp;&nbsp;
              {item && item.destinationCity})
            </h1>
            <h1 className="text-[14px] text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-6">
              {item && item.departmentDate}&nbsp;&nbsp;{item && item.departmentTime}~
              {item && item.arrivalTime}
            </h1>
          </>
        ))}

        <h1 className="text-[20px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-6 line-height-[20px]"></h1>
        <h1 className="text-[20px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-6">
          Past
        </h1>
        {pasts.map((item: BookFormData) => (
          <>
            <h1 className="text-[14px] text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-1">
              Booking Reference: &nbsp;&nbsp;{item && item.flightNumber}
            </h1>
            <h1 className="text-[14px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-1">
              Departure: &nbsp;&nbsp;(
              {item && item.departureCity}
              &nbsp;&nbsp;to&nbsp;&nbsp;
              {item && item.destinationCity})
            </h1>
            <h1 className="text-[14px] text-[#111416] font-['Plus_Jakarta_Sans'] text-left mb-6">
              {item && item.departmentDate}&nbsp;&nbsp;{item && item.departmentTime}~
              {item && item.arrivalTime}
            </h1>
          </>
        ))}
      </div>
    </div>
  );
};

export default BookPage;
