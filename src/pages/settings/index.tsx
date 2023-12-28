import { Space } from 'antd';
import Head from 'next/head';
import React from 'react';

import MonthTarget from '@/components/settings/MonthTarget';
import SaveMoneyTarget from '@/components/settings/SaveMoneyTarget';
import MainLayout from '@/layouts/MainLayout';

const SettingsIndex = () => {
  return (
    <MainLayout title="設定">
      <Head>
        <title>設定</title>
      </Head>
      <main>
        <Space
          size="middle"
          direction="vertical"
          style={{ display: 'flex', height: '100%' }}
        >
          <MonthTarget />
          <SaveMoneyTarget />
        </Space>
      </main>
    </MainLayout>
  );
};

export default SettingsIndex;
