import * as api from '@/api';
import { OrderData, TagIconData } from '@/types';
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import Header from '@components/common/Header';
import { Button, Card, Space, Table, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;

const OrderListPage = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState<OrderData[]>([]);
  useEffect(() => {
    (async () => {
      // 初始化代码
      const response = await api.getBookings();
      const data = await response.list;
      let orders: OrderData[] = [];
      data.forEach((item: any) => {
        orders.push({
          key: item.bookingId,
          orderId: 'ORD' + ('0000000' + item.bookingId).slice(-6),
          route: {
            from: item.departureCity + ' (' + item.departureCityAbbr + ')',
            to: item.destinationCity + ' (' + item.destinationCityAbbr + ')',
            departureTime: item.departmentDate + ' ' + item.departmentTime,
            arrivalTime:
              (item.departmentDate = item.arrivalDate ? '' : item.arrivalDate + ' ') +
              item.arrivalTime,
          },
          flightNumber: item.flightNumber,
          departureAirport: item.departureAirportName,
          terminal: item.departureAirportTerminal,
          passenger: item.userName,
          price: item.totalPrice,
          status: item.stauts,
          createTime: item.createTime,
        });
      });
      setOrderList(orders);
      console.log(orders);
    })();
  }, []);

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '航班路线',
      dataIndex: 'route',
      key: 'route',
      render: (route: { from: string; to: string; departureTime: string; arrivalTime: string }) => (
        <Space direction="vertical" size={0}>
          <div>
            <Text strong>{route.from}</Text>
            <ArrowRightOutlined style={{ margin: '0 8px' }} />
            <Text strong>{route.to}</Text>
          </div>
          <Text type="secondary">
            {route.departureTime} - {route.arrivalTime}
          </Text>
        </Space>
      ),
    },
    {
      title: '航班信息',
      dataIndex: 'flightNumber',
      key: 'flightInfo',
      render: (text: string, record: { departureAirport: string; terminal: string }) => (
        <Space direction="vertical" size={0}>
          <Text strong>航班号: {text}</Text>
          <Text type="secondary">
            {record.departureAirport} {record.terminal}
          </Text>
        </Space>
      ),
    },
    {
      title: '乘客',
      dataIndex: 'passenger',
      key: 'passenger',
    },
    {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <Text strong style={{ color: '#ff4d4f' }}>
          ¥{price}
        </Text>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => {
        let statusConfig = {} as TagIconData;
        switch (status) {
          case 'paid':
            statusConfig = {
              icon: <ClockCircleOutlined />,
              color: 'green',
              text: '已支付',
            };
            break;
          case 'pending':
            statusConfig = {
              icon: <ClockCircleOutlined />,
              color: 'orange',
              text: '待支付',
            };
            break;
          case 'cancelled':
            statusConfig = {
              icon: <CloseCircleOutlined />,
              color: 'red',
              text: '已取消',
            };
            break;
          default:
            statusConfig = {
              icon: <ClockCircleOutlined />,
              color: 'gray',
              text: '未知',
            };
        }
        return (
          <Tag icon={statusConfig.icon} color={statusConfig.color}>
            {statusConfig.text}
          </Tag>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: { status: string; orderId: string }) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  navigate(`/orderDetail/${record.orderId}`);
                }}
              >
                立即支付
              </Button>
              <Button size="small">取消订单</Button>
            </>
          )}
          {record.status === 'paid' && <Button size="small">查看详情</Button>}
          {record.status === 'cancelled' && <Button size="small">删除记录</Button>}
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      <Header loginIsDisplay={false} />

      <div className="max-w-[1100px] mx-auto px-4 pt-5 pb-10">
        <div style={{ padding: '24px', background: '#f0f2f5' }}>
          <Card
            title="我的订单"
            // extra={
            //   <Space>
            //     <Button>全部订单</Button>
            //     <Button type="primary">机票预订</Button>
            //   </Space>
            // }
          >
            <Table
              columns={columns}
              dataSource={orderList}
              pagination={{ pageSize: 10 }}
              rowClassName={(record) => {
                if (record.status === 'cancelled') {
                  return 'cancelled-row';
                }
                return '';
              }}
            />
          </Card>

          <style>{`
        .ant-table .cancelled-row td {
          color: rgba(0, 0, 0, 0.3);
        }
        .ant-table .cancelled-row td .ant-tag {
          opacity: 0.8;
        }
      `}</style>
        </div>
      </div>
    </div>
  );
};

export default OrderListPage;
