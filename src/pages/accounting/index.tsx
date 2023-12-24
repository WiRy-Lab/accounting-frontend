import {
  Button,
  DatePicker,
  Flex,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import AccountEditModal from '@/components/accounting/EditModal';
import AccountNewModal from '@/components/accounting/NewModal';
import AccountShowModal from '@/components/accounting/ShowModal';
import type { AccountingDTO } from '@/dto/AccountingDTO';
import type { CategoryDTO } from '@/dto/CategoryDTO';
import MainLayout from '@/layouts/MainLayout';
import $api from '@/plugins/api';

type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];

const config = {
  title: '刪除',
  content: '確定要刪除嗎？',
};

const AccountingIndex = () => {
  const [modalDataId, setModalDataId] = useState<number>(0);

  const [data, setData] = useState([]);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [modal, contextHolder] = Modal.useModal();

  const [messageApi, contextHolderMessage] = message.useMessage();

  const [categoryOption, setCategoryOption] = useState<CategoryDTO[] | []>([]);

  const [accountFilter, setAccountFilter] = useState<{
    from?: string;
    end?: string;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await $api.accounting.all(accountFilter);

      setData(result.data);
    };

    const fetchCategory = async () => {
      const result = await $api.category.all();

      setCategoryOption(result.data);
    };

    fetchData();
    fetchCategory();
  }, [isNewModalOpen, isEditModalOpen, accountFilter]);

  const filterData = (values: RangeValue) => {
    if (!values) {
      setAccountFilter((prev) => {
        return {
          ...prev,
          from: dayjs().startOf('month').format('YYYY-MM-DD'),
          end: dayjs().endOf('month').format('YYYY-MM-DD'),
        };
      });

      return;
    }

    const [from, end] = values;

    setAccountFilter((prev) => {
      return {
        ...prev,
        from: dayjs(from).format('YYYY-MM-DD'),
        end: dayjs(end).format('YYYY-MM-DD'),
      };
    });
  };

  const filterCategory = (values: string[]) => {
    setAccountFilter((prev) => {
      return {
        ...prev,
        category: values.join(','),
      };
    });
  };

  const closeModal = () => {
    setIsNewModalOpen(false);
    setIsShowModalOpen(false);
    setIsEditModalOpen(false);
    setModalDataId(0);
  };

  const columns: ColumnsType<AccountingDTO> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
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
      render: (text) => {
        const color = text === 'outcome' ? 'red' : 'green';

        switch (text) {
          case 'income':
            return <Tag color={color}>收入</Tag>;
          case 'outcome':
            return <Tag color={color}>支出</Tag>;
          default:
            return <Tag color={color}>{text}</Tag>;
        }
      },
    },
    {
      title: '金額',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => {
        return `$ ${text}`;
      },
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
        <AccountEditModal
          isOpen={isEditModalOpen}
          id={modalDataId}
          closeCallBack={closeModal}
        />
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Flex gap="middle" align="center" justify="space-between">
            <Flex gap="middle" align="center">
              <DatePicker.RangePicker
                onChange={filterData}
                defaultValue={[
                  dayjs().startOf('month'),
                  dayjs().endOf('month'),
                ]}
              />
              <Select
                mode="multiple"
                placeholder="請選擇分類"
                style={{ minWidth: '150px' }}
                onChange={filterCategory}
              >
                {categoryOption.map((ele) => (
                  <Select.Option value={ele.id} key={`Op${ele.id}`}>
                    {ele.name}
                  </Select.Option>
                ))}
              </Select>
            </Flex>
            <div>
              <Button
                type="primary"
                onClick={() => {
                  setIsNewModalOpen(true);
                }}
              >
                新增記帳
              </Button>
            </div>
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
