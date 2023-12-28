import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Spin,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { CategoryDTO } from '@/dto/CategoryDTO';
import $api from '@/plugins/api';

type FromValues = {
  category: number;
  target: number;
  from_date: dayjs.Dayjs;
  end_date: dayjs.Dayjs;
};

const SaveMoneyTarget = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const [categoryId, setCategoryId] = useState<number>(0);

  const [form] = Form.useForm();

  const handleCategoryChange = (value: number) => {
    setCategoryId(value);
  };

  const handleSubmit = async (value: FromValues) => {
    setLoading(true);

    const result = await $api.settings.setSaveMoneyTarget({
      category: categoryId,
      target: value.target,
      from_date: dayjs(value.from_date).format('YYYY-MM-DD'),
      end_date: dayjs(value.end_date).format('YYYY-MM-DD'),
    });

    if (result.status === 201) {
      messageApi.open({
        type: 'success',
        content: 'Set success!',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Create failed!',
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await $api.category.all();

      if (result.status !== 200) {
        return;
      }

      if (result.data.length > 0) {
        setCategoryId(result.data[0].id);
      }

      setCategories(result.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await $api.settings.getSaveMoneyTarget(categoryId);

      if (result.status === 200) {
        form.setFieldsValue({
          target: result.data.target,
        });
      } else {
        form.setFieldsValue({
          target: 0,
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [categoryId, form]);

  // useEffect(() => {
  // const fetchData = async () => {
  //   setLoading(true);
  //   const result = await $api.settings.getMonthTarget(
  //     nowYearMonth.year,
  //     nowYearMonth.month
  //   );
  //   if (result.status === 200) {
  //     form.setFieldsValue({
  //       income: result.data.income,
  //       outcome: result.data.outcome,
  //     });
  //   } else {
  //     form.setFieldsValue({
  //       income: 0,
  //       outcome: 0,
  //     });
  //   }
  //   setLoading(false);
  // };
  // fetchData();
  // }, [form]);

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <Card
          title="存錢目標設定"
          extra={
            <Button type="primary" onClick={() => form.submit()}>
              設定
            </Button>
          }
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              yearMonth: dayjs(),
            }}
            onFinish={handleSubmit}
          >
            <Form.Item label="類別" name="category">
              <Select
                key={categories[0]?.id}
                defaultValue={categories[0]?.id}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="輸入起始日期" name="from_date">
              <DatePicker
                picker="date"
                defaultValue={dayjs()}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="輸入結束日期" name="end_date">
              <DatePicker
                picker="date"
                defaultValue={dayjs()}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="輸入目標金額"
              name="target"
              extra="該類別目標累積金額"
            >
              <Input
                type="number"
                placeholder="請輸入目標金額"
                autoComplete="false"
                defaultValue={0}
              />
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </>
  );
};

export default SaveMoneyTarget;
