import { Button, Flex, message, Modal, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import AccountNewModal from '@/components/accounting/NewModal';
import AccountShowModal from '@/components/accounting/ShowModal';
import { AccountingDTO } from '@/dto/AccountingDTO';
import MainLayout from '@/layouts/MainLayout';
import $api from '@/plugins/api';

const config = {
  title: '刪除',
  content: '確定要刪除嗎？',
};

const AccountingIndex = () => {
  const [modalDataId, setModalDataId] = useState<number>(0);

  const [data, setData] = useState([]);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const [modal, contextHolder] = Modal.useModal();

  const [messageApi, contextHolderMessage] = message.useMessage();

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
    setModalDataId(0);
  };

  const columns: ColumnsType<AccountingDTO> = [
    {
      title: '名稱',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            setModalDataId(record.id);
            setIsShowModalOpen(true);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: '項目',
      dataIndex: 'type',
      key: 'type',
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
      render: (record) => (
        <Space size="middle">
          <Button
            type="link"
            danger
            onClick={async () => {
              const confirmed = await modal.confirm(config);

              if (!confirmed) {
                return;
              }

              const result = await $api.accounting.destroy(record.id);

              if (!result) {
                messageApi.open({
                  type: 'error',
                  content: 'Delete failed!',
                });

                return;
              }

              messageApi.open({
                type: 'success',
                content: 'Delete success!',
              });

              setData((prev) =>
                prev.filter((ele: AccountingDTO) => ele.id !== record.id)
              );
            }}
          >
            刪除
          </Button>
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
        {contextHolder}
        {contextHolderMessage}
        <AccountShowModal
          isOpen={isShowModalOpen}
          id={modalDataId}
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
            pagination={{ pageSize: 5 }}
            rowKey={(record) => record.id}
          />
        </Space>
      </main>
    </MainLayout>
  );
};

export default AccountingIndex;
