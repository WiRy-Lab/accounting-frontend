import { Button, Flex, message, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import CategoryEditModal from '@/components/category/EditModal';
import CategoryNewModal from '@/components/category/NewModal';
import type { CategoryDTO } from '@/dto/CategoryDTO';
import MainLayout from '@/layouts/MainLayout';
import $api from '@/plugins/api';

const config = {
  title: '刪除',
  content: '確定要刪除嗎？',
};

const AccountTypeIndex = () => {
  const [modalDataId, setModalDataId] = useState<number>(0);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [data, setData] = useState([]);

  const [modal, contextHolder] = Modal.useModal();

  const [messageApi, contextHolderMessage] = message.useMessage();

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsNewModalOpen(false);
    setModalDataId(0);
  };

  const columns: ColumnsType<CategoryDTO> = [
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              setModalDataId(record.id);
              setIsEditModalOpen(true);
            }}
          >
            編輯
          </Button>
          <Button
            type="link"
            danger
            onClick={async () => {
              const confirmed = await modal.confirm(config);

              if (!confirmed) {
                return;
              }

              const result = await $api.category.destroy(record.id);

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
                prev.filter((ele: CategoryDTO) => ele.id !== record.id)
              );
            }}
          >
            刪除
          </Button>
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
  }, [isNewModalOpen, isEditModalOpen]);

  return (
    <MainLayout title="類別管理">
      <Head>
        <title>類別管理</title>
      </Head>
      <main>
        {contextHolder}
        {contextHolderMessage}
        <CategoryEditModal
          isOpen={isEditModalOpen}
          id={modalDataId}
          closeCallBack={closeModal}
        />
        <CategoryNewModal isOpen={isNewModalOpen} closeCallBack={closeModal} />
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Flex gap="middle" align="center" justify="end">
            <Button
              onClick={() => {
                setIsNewModalOpen(true);
              }}
              type="primary"
            >
              新增類別
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

export default AccountTypeIndex;
