import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Flex } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Head from 'next/head';
import MainLayout from '@/layouts/MainLayout';
import AccountShowModal from '@/components/accounting/ShowModal';
import AccountNewModal from '@/components/accounting/NewModal';
import { AccountingDTO } from '@/dto/AccountingDTO';

import $api from '@/plugins/api';

const AccountingIndex = () => {
  const [modalData, setModalData] = useState<AccountingDTO | null>(null);

  const [data, setData] = useState();

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await $api.accounting.all();

      setData(result.data);
    };

    fetchData();
  }, [isNewModalOpen]);

  const closeModal = () => {
    setIsNewModalOpen(false);
    setIsShowModalOpen(false);
    setModalData(null);
  };

  const columns: ColumnsType<AccountingDTO> = [
    {
      title: '項目',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            setModalData(record);
            setIsShowModalOpen(true);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: '類別',
      key: 'category',
      dataIndex: 'category',
      render: (_, { category }) => (
        <>
          {category.map((ele) => {
            const color = ele.name.length > 5 ? 'geekblue' : 'green';

            return (
              <Tag color={color} key={ele.id}>
                {ele.name}
              </Tag>
            );
          })}
        </>
      ),
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

  return (
    <MainLayout title="所有記帳">
      <Head>
        <title>所有記帳</title>
      </Head>
      <main>
        <AccountShowModal
          isOpen={isShowModalOpen}
          data={modalData}
          closeCallBack={closeModal}
        />
        <AccountNewModal isOpen={isNewModalOpen} closeCallBack={closeModal} />
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Flex gap="middle" align="center" justify="end">
            <Button
              type="primary"
              onClick={() => {
                setIsNewModalOpen(true);
              }}
            >
              新增記帳
            </Button>
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

export default AccountingIndex;
