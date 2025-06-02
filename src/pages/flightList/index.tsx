import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@components/common/Header';
import Button from '@components/ui/Button';
import Table from '@components/ui/Table';
import { FlightListFormData } from '@types/FlightList';
import * as api from '@api';
import toast from '@config/toast';
import { DynamicTable } from '@/components/ui/DynamicTable';

const FlightListPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FlightListFormData>([]);

  const handleClick = (e: any, row: any) => {
    navigate('/flight', { state: row.original });
  };

  // VSCode报错：Binding element 'value' implicitly has an 'any' type
  // 解决方法1：在CellProps中添加type: Cell
  interface Cell {
    value: any;
    row: any;
  }

  const columns = [
    {
      Header: 'Airline',
      accessor: 'flightNumber',
      Cell: ({ value, row }: Cell) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: 'Departure',
      accessor: 'departmentTime',
      Cell: ({ value, row }: Cell) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: 'Arrival',
      accessor: 'arrivalTime',
      // VSCode报错：Binding element 'value' implicitly has an 'any' type
      // 解决方法1：在CellProps中添加type: Cell
      Cell: ({ value, row }: Cell) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: 'Duration',
      accessor: 'duration',
      // VSCode报错：Binding element 'value' implicitly has an 'any' type
      // 解决方法2：在CellProps中添加type: { value: any; row: any }
      Cell: ({ value, row }: { value: any; row: any }) => (
        <div style={{ textAlign: 'center' }}>{value}</div>
      ),
    },
    { Header: 'Stops', accessor: '' },
    {
      Header: 'Price',
      accessor: 'price',
      Cell: ({ value, row }: Cell) => <div style={{ textAlign: 'center' }}>${value}</div>,
    },
    {
      Header: 'Actions',
      Cell: ({ row }: { row: any }) => (
        <div style={{ textAlign: 'center' }}>
          {' '}
          <button onClick={(e) => handleClick(e, row)}>Select</button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      // 初始化代码
      const response = await api.searchFlights(formData);
      const data = await response.list;
      setFormData(data);
      console.log(data);
    })();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <Header loginIsDisplay={false} />

      <div className="max-w-[750px] mx-auto px-4 pt-14 pb-10">
        <h1 className="text-[28px] font-bold text-[#111416] font-['Plus_Jakarta_Sans'] text-center mb-6">
          Review your flights
        </h1>
        {/* <DynamicTable<Flight>
          columns={columns}
          data={filteredFlights}
          loading={loading}
          loadingComponent={<div className="text-center py-8">Loading users...</div>}
          emptyComponent={<div className="text-center py-8">No users found</div>}
          className="border rounded-lg shadow-sm"
          headerClassName="bg-gray-50 border-b"
          rowClassName="border-b hover:bg-gray-50"
          cellClassName="border-r last:border-r-0"
          onRowClick={handleRowClick}
        /> */}
        <Table columns={columns} data={formData} />
      </div>
    </div>
  );
};

export default FlightListPage;
