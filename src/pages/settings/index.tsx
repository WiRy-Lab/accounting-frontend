import Head from 'next/head';
import React from 'react';

import MonthTarget from '@/components/settings/MonthTarget';
import MainLayout from '@/layouts/MainLayout';

const SettingsIndex = () => {
  return (
    <MainLayout title="設定">
      <Head>
        <title>設定</title>
      </Head>
      <main>
        <MonthTarget />
      </main>
    </MainLayout>
  );
};

export default SettingsIndex;
