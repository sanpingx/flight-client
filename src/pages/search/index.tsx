import * as api from '@/api';
import { FlightData, SearchFormData, SelectData } from '@/types';
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import Header from '@components/common/Header';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  List,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;
const { Text } = Typography;

const FlightSearchPage = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<FlightData[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchFormData>();
  const [cityData, setCityData] = useState<SelectData[]>([]);

  const handleClick = (e: any, row: any) => {
    console.log(row.original);
    navigate('/book', { state: row });
  };

  useEffect(() => {
    (async () => {
      // 初始化代码
      const response = await api.getAirports();
      const data = await response.list;
      let selectCityDatas: SelectData[] = [];
      data.forEach((item: any) => {
        selectCityDatas.push({
          value: item.abbreviation,
          label: item.city,
        });
      });
      setCityData(selectCityDatas);
      console.log(selectCityDatas);
    })();
  }, []);

  // 模拟搜索请求
  const searchFlights = async (values: {
    departure: any;
    arrival: any;
    date: { format: (arg0: string) => any };
  }) => {
    setLoading(true);
    try {
      const response = await api.searchFlights(values);
      const data = await response.list;
      let flights: FlightData[] = [];
      data.forEach((item: any) => {
        flights.push({
          ...item,
          id: item.flightId,
          flightNumber: item.flightNumber,
          airline: item.flightCompany,
          airlineIcon: 'https://example.com/csair.png',
          departureTime: String(item.departmentTime).substring(0, 5),
          arrivalTime: String(item.arrivalTime).substring(0, 5),
          departureAirport: item.departureAirportName + '(' + item.departureCityAbbr + ')',
          arrivalAirport: item.destinationAirportName + '(' + item.destinationCityAbbr + ')',
          durationH:
            Math.floor(item.duration / 60) > 0 ? Math.floor(item.duration / 60) + '小时' : '',
          durationM: (item.duration % 60) + '分钟',
          price: item.price,
          terminal: item.departureAirportTerminal,
        });
      });

      const filteredResults = flights.filter((flight) => {
        // 这里可以添加实际的过滤逻辑
        return (
          flight.departureAirport.includes(values.departure) &&
          flight.arrivalAirport.includes(values.arrival)
        );
      });

      console.log(filteredResults);

      setSearchResults(filteredResults);
      setSearchParams({
        departure: values.departure,
        arrival: values.arrival,
        date: values.date.format('YYYY-MM-DD'),
      } as SearchFormData);
      setHasSearched(true);
      message.success('查询成功');
    } catch (error) {
      message.error('查询失败');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: any) => {
    searchFlights(values);
  };

  const resetSearch = () => {
    form.resetFields();
    // form.setFieldsValue({
    //   date: new Date(),
    // });
    setSearchResults([]);
    setHasSearched(false);
    setSearchParams(undefined);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header loginIsDisplay={false} />
      <div className="max-w-[900px] mx-auto px-4 pt-5 pb-10">
        <div style={{ padding: '24px', background: '#f0f2f5' }}>
          <Card
            title="航班查询"
            style={{ marginBottom: '24px' }}
            extra={<Button onClick={resetSearch}>重新查询</Button>}
          >
            <Form form={form} name="flight_search" onFinish={onFinish} layout="vertical">
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    name="departure"
                    label="出发地"
                    rules={[{ required: true, message: '请选择出发地!' }]}
                  >
                    <Select
                      placeholder="选择出发城市"
                      // showSearch
                      // optionFilterProp="children"
                      // filterOption={(input, option) =>
                      //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      // }
                    >
                      {cityData.map((city) => (
                        <Option key={city.value} value={city.value}>
                          {city.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="arrival"
                    label="目的地"
                    rules={[{ required: true, message: '请选择目的地!' }]}
                  >
                    <Select
                      placeholder="选择到达城市"
                      // showSearch
                      // optionFilterProp="children"
                      // filterOption={(input, option) =>
                      //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      // }
                    >
                      {cityData.map((city) => (
                        <Option key={city.value} value={city.value}>
                          {city.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    name="date"
                    // initialValue={moment()}
                    label="出发日期"
                    rules={[{ required: true, message: '请选择出发日期!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item name="flightNumber" label="航班号 (可选)">
                    <Input placeholder="输入航班号" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  {/* <Space direction="vertical" align="end"> */}
                  <Form.Item
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end',
                      height: '70%',
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SearchOutlined />}
                      style={{ width: '100%' }}
                      loading={loading}
                    >
                      查询航班
                    </Button>
                  </Form.Item>
                  {/* </Space> */}
                </Col>
              </Row>
            </Form>
          </Card>

          {hasSearched && (
            <Card title={`查询结果`}>
              {loading ? (
                <Spin size="large" />
              ) : searchResults.length > 0 ? (
                <List
                  itemLayout="vertical"
                  dataSource={searchResults}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      extra={
                        <Space direction="vertical" align="end">
                          <Text strong style={{ fontSize: '20px', color: '#ff4d4f' }}>
                            ¥{item.price}
                          </Text>
                          <Button type="primary" size="large" onClick={(e) => handleClick(e, item)}>
                            预订
                          </Button>
                        </Space>
                      }
                    >
                      <List.Item.Meta
                        avatar={
                          <div
                            style={{
                              width: 40,
                              height: 40,
                              background: '#f0f2f5',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 4,
                            }}
                          >
                            {item.airline.substring(0, 2)}
                          </div>
                        }
                        title={
                          <Text strong>
                            {item.airline} {item.flightNumber}
                          </Text>
                        }
                        description={
                          <Space size="large" align="center">
                            <div style={{ textAlign: 'center' }}>
                              <Text strong style={{ fontSize: '16px' }}>
                                {item.departureTime}
                              </Text>
                              <br />
                              <Text style={{ color: '#595959', fontSize: '14px' }}>
                                {item.departureAirport} <Tag color="blue">{item.terminal}</Tag>
                              </Text>
                            </div>

                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}
                            >
                              <ArrowRightOutlined />
                              <Text type="secondary" style={{ marginTop: 8, fontSize: '12px' }}>
                                {item.durationH + item.durationM}
                              </Text>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <Text strong style={{ fontSize: '16px' }}>
                                {item.arrivalTime}
                              </Text>
                              <br />
                              <Text style={{ color: '#595959', fontSize: '14px' }}>
                                {item.arrivalAirport}
                              </Text>
                            </div>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Text type="secondary">未找到符合条件的航班</Text>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearchPage;
