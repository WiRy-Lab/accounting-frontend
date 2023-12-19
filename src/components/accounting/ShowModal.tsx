import React, { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import type { AccountingDTO } from '@/dto/AccountingDTO';
import $api from '@/plugins/api';

type Props = {
  id: number;
  isOpen: boolean;
  closeCallBack: () => void;
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
        title={data?.title}
        open={isOpen}
        onOk={handleOk}
        onCancel={closeCallBack}
      />
    </>
  );
};

export default AccountShowModal;
