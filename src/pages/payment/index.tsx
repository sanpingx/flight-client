import * as api from '@/api';
import {
  AlipayOutlined,
  BankOutlined,
  CreditCardOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import Header from '@components/common/Header';
import { useAuth } from '@config/route/authContext';
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Steps,
  Typography,
} from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { Step } = Steps;
const { Title, Text } = Typography;

const PaymentPage = () => {
  const navigate = useNavigate();
  const { loginInfo, isAuthenticated } = useAuth();
  let location = useLocation();
  const { state } = location;
  console.log(state);

  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const onFinish = async (values: any) => {
    const res = await api.addBooking({
      userId: loginInfo?.userId,
      flightId: state.flightId,
      reference: '',
      stauts: 'paid',
      bookingTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      totalPrice: state.price,
    });
    state.bookingId = res;
    navigate('/completion', { state: state });
    console.log('Received values of form: ', values);
    // 这里处理支付逻辑
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header loginIsDisplay={false} />

      <div className="max-w-[800px] mx-auto px-4 pt-5 pb-10">
        <div style={{ padding: '24px', background: '#f0f2f5' }}>
          <Card>
            <Steps current={2} style={{ marginBottom: '16px' }}>
              <Step title="选择航班" />
              <Step title="填写订单" />
              <Step title="支付" />
              <Step title="完成" />
            </Steps>

            <Title level={4} style={{ marginBottom: 16 }}>
              支付信息
            </Title>

            <div style={{ marginBottom: 24 }}>
              <Text strong style={{ fontSize: 16 }}>
                订单总金额：
              </Text>
              <Text strong style={{ fontSize: 20, color: '#ff4d4f' }}>
                ¥{state.price}
              </Text>
            </div>

            <Form form={form} onFinish={onFinish}>
              <Form.Item
                name="paymentMethod"
                label="支付方式"
                rules={[{ required: true, message: '请选择支付方式' }]}
              >
                <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)}>
                  <Space direction="vertical">
                    <Radio value="credit">
                      <Space>
                        <CreditCardOutlined />
                        <Text>信用卡支付</Text>
                      </Space>
                    </Radio>
                    <Radio value="wechat">
                      <Space>
                        <WechatOutlined />
                        <Text>微信支付</Text>
                      </Space>
                    </Radio>
                    <Radio value="alipay">
                      <Space>
                        <AlipayOutlined />
                        <Text>支付宝</Text>
                      </Space>
                    </Radio>
                    <Radio value="bank">
                      <Space>
                        <BankOutlined />
                        <Text>网银转账</Text>
                      </Space>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              {paymentMethod === 'credit' && (
                <>
                  <Form.Item
                    name="cardNumber"
                    label="信用卡号"
                    rules={[{ required: true, message: '请输入信用卡号' }]}
                  >
                    <Input placeholder="请输入16位信用卡号" maxLength={16} />
                  </Form.Item>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="expiryDate"
                        label="有效期"
                        rules={[{ required: true, message: '请输入有效期' }]}
                      >
                        <Input placeholder="MM/YY" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="cvv"
                        label="CVV"
                        rules={[{ required: true, message: '请输入CVV' }]}
                      >
                        <Input placeholder="背面3位数字" maxLength={3} />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              <Divider />

              <Alert
                message="支付提示"
                description="请确保在15分钟内完成支付，超时订单将自动取消"
                type="info"
                showIcon
                style={{ marginBottom: 24 }}
              />

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
                  确认支付
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
