import React, { useState } from 'react';
import { Space, Table, Tag, Button, Flex } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Head from 'next/head';
import MainLayout from '@/layouts/MainLayout';
import AccountShowModal from '@/components/accounting/ShowModal';
import AccountNewModal from '@/components/accounting/NewModal';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const AccountingIndex = () => {
  const [modalData, setModalData] = useState<DataType | null>(null);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const closeNewModal = () => {
    setIsNewModalOpen(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            setModalData(record);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';

            if (tag === 'loser') {
              color = 'volcano';
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <MainLayout title="所有記帳">
      <Head>
        <title>所有記帳</title>
      </Head>
      <main>
        <AccountShowModal data={modalData} />
        <AccountNewModal
          isOpen={isNewModalOpen}
          closeCallBack={closeNewModal}
        />
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
          <Table columns={columns} dataSource={data} />
        </Space>
      </main>
    </MainLayout>
  );
};

export default AccountingIndex;
