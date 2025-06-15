import React from 'react';
import { Link } from 'react-router-dom';


interface HeaderProps {
  bookIsDisplay?: boolean;
  manageIsDisplay?: boolean;
  loginIsDisplay?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  bookIsDisplay = true,
  manageIsDisplay = true,
  loginIsDisplay = true,
}) => {
  return (
    <header className="h-[65px] w-full border border-solid border-[#e5e8ea] flex items-center justify-between px-10">
      <div className="flex items-center">
        <img src="/images/img_vector_0.svg" alt="Logo" className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-6">
        {bookIsDisplay && (
          <Link to="/search" className="text-[14px] font-medium text-[#111416] font-['Plus_Jakarta_Sans']">
            航班查询
          </Link>
        )}
        {manageIsDisplay && (
          <Link to="/orderList" className="text-[14px] font-medium text-[#111416] font-['Plus_Jakarta_Sans']">
            我的订单
          </Link>
        )}
        {loginIsDisplay && (
          <div className="bg-[#f2f2f4] rounded-[20px] h-10 px-5 flex items-center justify-center">
            <span className="text-[14px] font-bold text-[#111416] font-['Plus_Jakarta_Sans']">
              Log in
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;