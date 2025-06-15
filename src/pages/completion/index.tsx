import React from 'react';
import { Card, Steps, Typography, Button, Result, Divider, Descriptions } from 'antd';
import { CheckCircleOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import Header from '@components/common/Header';
import { useLocation, useNavigate } from 'react-router-dom';

const { Step } = Steps;
const { Title, Text } = Typography;

const CompletionPage = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const { state } = location;
  console.log(state);
  const bookingId = 'ORD' + ('0000000' + state.bookingId).slice(-6);

  return (
    <div className="w-full min-h-screen bg-white">
      <Header loginIsDisplay={false} />

      <div className="max-w-[800px] mx-auto px-4 pt-5 pb-10">
        <div style={{ padding: '24px', background: '#f0f2f5' }}>
          <Card>
            <Steps current={3} style={{ marginBottom: '16px' }}>
              <Step title="选择航班" />
              <Step title="填写订单" />
              <Step title="支付" />
              <Step title="完成" />
            </Steps>

            <Result
              icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              status="success"
              title="订单支付成功！"
              subTitle={`订单号: ${bookingId} 已支付金额: ¥${state.price}`}
              extra={[
                <Button key="home" onClick={() => navigate('/orderList')}>
                  订单详情
                </Button>,
              ]}
            />

            <Divider style={{ margin: '12px 0' }} />

            <Title level={4} style={{ marginBottom: 16 }}>
              温馨提示
            </Title>
            <div style={{ marginBottom: 16 }}>
              <Text>
                <MailOutlined style={{ marginRight: 8 }} />
                行程确认单已发送至您的邮箱: zhangsan@example.com
              </Text>
            </div>
            <div>
              <Text>
                <PhoneOutlined style={{ marginRight: 8 }} />
                如需帮助，请联系客服热线: 400-123-4567
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;
