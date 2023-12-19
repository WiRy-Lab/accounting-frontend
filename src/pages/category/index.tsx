import { Button, Flex, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import type { CategoryDTO } from '@/dto/CategoryDTO';
import MainLayout from '@/layouts/MainLayout';
import $api from '@/plugins/api';

const AccountTypeIndex = () => {
  const [data, setData] = useState();

  const columns: ColumnsType<CategoryDTO> = [
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Button type="link">{text}</Button>,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await $api.category.all();

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <MainLayout title="類別管理">
      <Head>
        <title>類別管理</title>
      </Head>
      <main>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Flex gap="middle" align="center" justify="end">
            <Button type="primary">新增類別</Button>
          </Flex>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </Space>
      </main>
    </MainLayout>
  );
};

export default AccountTypeIndex;
