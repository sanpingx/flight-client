import { CreditCardOutlined } from '@ant-design/icons';
import Header from '@components/common/Header';
import { useAuth } from '@config/route/authContext';
import { Button, Card, Descriptions, Divider, Steps, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Step } = Steps;
const { Title, Text } = Typography;

const OrderPage = () => {
  const { loginInfo, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  let location = useLocation();
  const { state } = location;
  console.log(state);

  return (
    <div className="w-full min-h-screen bg-white">
      <Header loginIsDisplay={false} />

      <div className="max-w-[800px] mx-auto px-4 pt-5 pb-10">
        <div style={{ padding: '24px', background: '#f0f2f5' }}>
          <Card>
            <Steps current={1} style={{ marginBottom: '16px' }}>
              <Step title="选择航班" />
              <Step title="填写订单" />
              <Step title="支付" />
              <Step title="完成" />
            </Steps>

            <div style={{ margin: '0 0 16px 0' }}>
              <Title level={4} style={{ marginBottom: 6 }}>
                订单信息
              </Title>
              <Descriptions
                bordered
                column={1}
                size="small"
                style={{ marginBottom: 16 }}
                contentStyle={{ padding: '6px 12px' }}
                labelStyle={{ padding: '6px 12px' }}
              >
                <Descriptions.Item label="航班路线">
                  <div style={{ lineHeight: 1.5 }}>
                    <Text strong>
                      {state.departureCity} ({state.departureCityAbbr})
                    </Text>
                    <span style={{ margin: '0 8px' }}>→</span>
                    <Text strong>
                      {state.destinationCity} ({state.destinationCityAbbr})
                    </Text>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="航班时间">
                  <div style={{ lineHeight: 1.5 }}>
                    <Text>
                      {state.departmentDate} {state.departmentTime} - {state.arrivalDate}
                      {state.arrivalTime}
                    </Text>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="航班号">{state.flightNumber}</Descriptions.Item>
                <Descriptions.Item label="出发机场">
                  {state.departureAirportName} {state.departureAirportTerminal}
                </Descriptions.Item>
                <Descriptions.Item label="价格">
                  <Text strong style={{ fontSize: '16px', color: '#ff4d4f' }}>
                    ¥{state.price}
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </div>

            <Divider style={{ margin: '12px 0' }} />

            <Title level={4} style={{ marginBottom: 12 }}>
              乘客信息
            </Title>
            <Descriptions
              bordered
              column={3}
              size="small"
              contentStyle={{ padding: '6px 12px' }}
              labelStyle={{ padding: '6px 12px' }}
            >
              <Descriptions.Item label="姓名">{loginInfo?.name}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{loginInfo?.phone}</Descriptions.Item>
            </Descriptions>

            <Divider style={{ margin: '12px 0' }} />

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Button
                type="primary"
                size="large"
                icon={<CreditCardOutlined />}
                style={{ marginRight: '12px' }}
                onClick={() => navigate('/payment', { state: state })}
              >
                立即支付
              </Button>
              <Button size="large" onClick={() => navigate('/search')}>
                返回修改
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
