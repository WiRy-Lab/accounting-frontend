import Head from 'next/head';
import React from 'react';

import MainLayout from '@/layouts/MainLayout';

const SettingsIndex = () => {
  return (
    <MainLayout title="設定">
      <Head>
        <title>設定</title>
      </Head>
      <main>
        <h1>設定</h1>
      </main>
    </MainLayout>
  );
};

export default SettingsIndex;
