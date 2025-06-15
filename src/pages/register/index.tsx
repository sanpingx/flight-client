import * as api from '@/api';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import toast from '@config/toast';
import { Button, Card, Form, Input, message, Select } from 'antd';
import { Link } from 'react-router-dom';
const { Option } = Select;

const RegisterPage = () => {
  const onFinish = async (values: any) => {
    values.firstName = values.name.split(' ')[0];
    values.lastName = values.name.includes(' ') ? values.name.split(' ')[1] : '';
    console.log('Received values of form: ', values);
    const res = await api.register(values);
    toast.success('注册成功');
    // console.log('Received values of form: ', values);
    // message.success('注册成功');
    // 这里添加注册逻辑
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('两次输入的密码不匹配!'));
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f0f2f5',
      }}
    >
      <Card title="用户注册" style={{ width: 500 }}>
        <Form name="register" onFinish={onFinish} scrollToFirstError>
          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: '请输入有效的邮箱地址!' },
              { required: true, message: '请输入您的邮箱!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item name="phone" rules={[{ required: true, message: '请输入您的电话号码!' }]}>
            <Input prefix={<PhoneOutlined />} placeholder="电话号码" />
          </Form.Item>

          <Form.Item name="name" rules={[{ required: true, message: '请输入您的姓名!' }]}>
            <Input prefix={<UserOutlined />} placeholder="姓名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 8, message: '密码至少8个字符!' },
              { pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/, message: '密码必须包含字母和数字!' },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[{ required: true, message: '请确认密码!' }, validatePassword]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>

          <Form.Item name="country" rules={[{ required: true, message: '请选择您的国家!' }]}>
            <Select placeholder="选择国家">
              <Option value="china">中国</Option>
              <Option value="usa">美国</Option>
              <Option value="uk">英国</Option>
              <Option value="japan">日本</Option>
            </Select>
          </Form.Item>

          <Form.Item name="region" rules={[{ required: true, message: '请选择您的地区!' }]}>
            <Select placeholder="选择地区">
              <Option value="east">东部</Option>
              <Option value="west">西部</Option>
              <Option value="south">南部</Option>
              <Option value="north">北部</Option>
            </Select>
          </Form.Item>

          <Form.Item name="gender" rules={[{ required: true, message: '请选择您的性别!' }]}>
            <Select placeholder="选择性别">
              <Option value="male">男</Option>
              <Option value="female">女</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              注册
            </Button>
            <p className="text-[14px] font-normal text-[#6b7782] font-['Plus_Jakarta_Sans'] text-center mt-4">
              已有账号?{' '}
              <Link to="/login" className="text-[#6b7782]">
                立即登录
              </Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
