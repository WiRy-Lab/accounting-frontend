import { message, Modal, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import type { AccountingDTO } from '@/dto/AccountingDTO';
import $api from '@/plugins/api';

const { Title } = Typography;

type Props = {
  id: number;
  isOpen: boolean;
  closeCallBack: () => void;
};

const getTypeCH = (type: string) => {
  switch (type) {
    case 'outcome':
      return '支出';
    case 'income':
      return '收入';
    default:
      return '';
  }
};

const AccountShowModal = ({ isOpen, id, closeCallBack }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState<AccountingDTO>();

  const handleOk = () => {
    closeCallBack();
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await $api.accounting.show(id);

      if (result.status === 200) {
        setData(result.data);
      } else {
        messageApi.open({
          type: 'error',
          content: 'Fetch failed!',
        });
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, id, messageApi]);

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <Title level={4} style={{ margin: '0px' }}>
            {data?.title}
          </Title>
        }
        open={isOpen}
        onOk={handleOk}
        onCancel={closeCallBack}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Title level={5} style={{ margin: '5px 0px' }}>
          日期：{data?.date}
        </Title>
        <Title level={5} style={{ margin: '5px 0px' }}>
          類型：{getTypeCH(data?.type ?? '')}
        </Title>
        <Title level={5} style={{ margin: '5px 0px' }}>
          金額：{data?.amount}
        </Title>
        <Title level={5} style={{ margin: '5px 0px' }}>
          分類：{data?.category.map((ele) => ele.name).join(', ')}
        </Title>
        <Title level={5} style={{ margin: '5px 0px' }}>
          備註：
          <p style={{ margin: '0px' }}>{data?.description}</p>
        </Title>
      </Modal>
    </>
  );
};

export default AccountShowModal;
