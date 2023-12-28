import { Card, Flex, message, Progress, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

import type { CategoryDTO } from '@/dto/CategoryDTO';
import $api from '@/plugins/api';

const twoColors = { '0%': '#108ee9', '100%': '#87d068' };

const { Title } = Typography;

type ChartData = {
  category_id: number;
  target_amount: number;
  current_amount: number;
  progress: number;
  end_date: string;
  from_date: string;
};

const SaveMoneyChart = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const [categoryId, setCategoryId] = useState<number>(0);

  const [data, setData] = useState<ChartData>({
    category_id: 0,
    target_amount: 0,
    current_amount: 0,
    progress: 0,
    end_date: '未設定',
    from_date: '未設定',
  });

  const handleCategoryChange = (value: number) => {
    setCategoryId(value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await $api.category.all();

      if (result.status !== 200) {
        return;
      }

      setCategories(result.data);

      if (result.data.length > 0) {
        setCategoryId(result.data[0].id);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSaveMoneyStatus = async () => {
      const result = await $api.charts.saveTarget(categoryId);

      if (result.status !== 200) {
        setData({
          category_id: 0,
          target_amount: 0,
          current_amount: 0,
          progress: 0,
          end_date: '未設定',
          from_date: '未設定',
        });
      }

      setData(result.data);
    };

    fetchSaveMoneyStatus();
  }, [categoryId, messageApi]);

  return (
    <>
      {contextHolder}
      <Card style={{ height: '100%' }}>
        <Title level={4} style={{ marginTop: '0' }}>
          存錢狀態
        </Title>
        <Select
          key={categories[0]?.id}
          defaultValue={categories[0]?.id}
          onChange={handleCategoryChange}
          style={{ width: '100%', marginBottom: '20px' }}
        >
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
        <Progress
          percent={data?.progress ?? 0}
          strokeColor={twoColors}
          size={['100%', 20]}
          status="active"
        />
        <Flex gap="middle" justify="space-between">
          <div style={{ marginTop: '20px' }}>
            <span>目標區間: </span>
            <span style={{ marginLeft: '5px' }}>
              {data?.from_date
                ? `${data?.from_date} ~ ${data?.end_date}`
                : '未設定'}
            </span>
          </div>
          <Flex gap="small">
            <div style={{ marginTop: '20px' }}>
              <span>目前金額: </span>
              <span style={{ color: '#52c41a', marginLeft: '5px' }}>
                ${data?.current_amount ?? 0}
              </span>
            </div>
            <div style={{ marginTop: '20px' }}>
              <span>目標金額: </span>
              <span style={{ color: '#ff4d4f', marginLeft: '5px' }}>
                {data?.target_amount ? `$${data?.target_amount}` : '未設定'}
              </span>
            </div>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default SaveMoneyChart;
