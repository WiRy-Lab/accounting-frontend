import { DatePicker, message, Space, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

import MainLayout from '@/layouts/MainLayout';
import $api from '@/plugins/api';

const { Title } = Typography;

type AdviceData = {
  status: boolean;
  result: string;
};

const AdviceIndex = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<AdviceData>({ status: false, result: '' });

  const [nowYearMonth, setNowYearMonth] = useState<{
    year: number;
    month: number;
  }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const handleOnChange = (yearMonth: dayjs.Dayjs | null) => {
    if (yearMonth === null) return;
    setNowYearMonth({
      year: yearMonth.year(),
      month: yearMonth.month() + 1,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await $api.reports.getMonthlyAnalysis(nowYearMonth);

      if (result.status === 200) {
        const content = await remark().use(html).process(result.data.result);

        setData({
          ...result.data,
          result: content.toString(),
        });
      } else {
        messageApi.open({
          type: 'error',
          content: '資料獲取失敗！',
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [nowYearMonth, messageApi]);

  return (
    <MainLayout title="財務建議">
      <Head>
        <title>財務建議</title>
      </Head>
      <main>
        {contextHolder}
        <Spin
          spinning={loading}
          tip="AI 分析中，請耐心等候..."
          size="large"
          style={{ height: '100%' }}
        >
          <Space
            direction="vertical"
            style={{ display: 'flex', height: '100%' }}
          >
            <Title level={4} style={{ margin: '10px 0px' }}>
              選擇月份：
            </Title>
            <DatePicker
              picker="month"
              defaultValue={dayjs()}
              style={{ width: '100%' }}
              onChange={handleOnChange}
            />

            <div
              style={{ width: '100%', height: '100%', fontSize: '16px' }}
              dangerouslySetInnerHTML={{ __html: data.result }}
            />
          </Space>
        </Spin>
      </main>
    </MainLayout>
  );
};

export default AdviceIndex;
