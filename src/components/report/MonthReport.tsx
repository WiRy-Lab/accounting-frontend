import { Button, Card, DatePicker, Form, message, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import $api from '@/plugins/api';

type FromValues = {
  date: dayjs.Dayjs;
};

const MonthReport = () => {
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (value: FromValues) => {
    setLoading(true);
    const result = await $api.reports.getMonthReports(
      value.date.year(),
      value.date.month() + 1
    );

    if (result.status !== 200) {
      messageApi.open({
        type: 'error',
        content: '下載失敗',
      });
      setLoading(false);

      return;
    }

    const link = document.createElement('a');

    link.href = result.data.url;
    link.download = result.data.filename;
    link.click();
    setLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <Card
          title="每月報表"
          extra={
            <Button type="primary" onClick={() => form.submit()}>
              下載
            </Button>
          }
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              date: dayjs(),
            }}
            onFinish={handleSubmit}
          >
            <Form.Item label="選擇年月" name="date">
              <DatePicker picker="month" style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </>
  );
};

export default MonthReport;
