import { Space } from 'antd';
import Head from 'next/head';
import React from 'react';

import MonthReport from '@/components/report/MonthReport';
import YearReport from '@/components/report/YearReport';
import MainLayout from '@/layouts/MainLayout';

const ReportIndex = () => {
  return (
    <MainLayout title="匯出報表">
      <Head>
        <title>匯出報表</title>
      </Head>
      <main>
        <Space direction="vertical" size={16} style={{ display: 'flex' }}>
          <YearReport />
          <MonthReport />
        </Space>
      </main>
    </MainLayout>
  );
};

export default ReportIndex;
