import { Button, Card, DatePicker, Form, Input, message, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import $api from '@/plugins/api';

type FromValues = {
  id: number;
  yearMonth: dayjs.Dayjs;
  income: number;
  outcome: number;
};

const SettingsIndex = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  // const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const [nowYearMonth, setNowYearMonth] = useState<{
    year: number;
    month: number;
  }>({
    year: dayjs().year(),
    month: dayjs().month() + 1,
  });

  const [form] = Form.useForm();

  const handleSubmit = async (value: FromValues) => {
    setLoading(true);
    const result = await $api.settings.setMonthTarget({
      year: value.yearMonth.year(),
      month: value.yearMonth.month() + 1,
      income: value.income,
      outcome: value.outcome,
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

  const handleOnChange = (yearMonth: dayjs.Dayjs | null) => {
    if (yearMonth === null) return;
    setNowYearMonth({
      year: yearMonth.year(),
      month: yearMonth.month() + 1,
    });
  };

  useEffect(() => {
    // const fetchCategories = async () => {
    //   const result = await $api.categories.getCategories();
    //   setCategories(result.data);
    // }
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
  }, [nowYearMonth, form]);

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <Card
          title="每月目標設定"
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
            <Form.Item label="年月" name="yearMonth">
              <DatePicker
                picker="month"
                style={{ width: '100%' }}
                onChange={handleOnChange}
              />
            </Form.Item>
            <Form.Item label="輸入目標收入" name="income" extra="當月目標收入">
              <Input
                type="number"
                placeholder="請輸入目標金額"
                autoComplete="false"
                defaultValue={0}
              />
            </Form.Item>
            <Form.Item
              label="輸入目標支出"
              name="outcome"
              extra="當月目標最大支出，即為當月可消費金額"
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

export default SettingsIndex;
