import React from 'react';
import { Modal } from 'antd';
import type { AccountingDTO } from '@/dto/AccountingDTO';

type Props = {
  isOpen: boolean;
  data: AccountingDTO | null;
  closeCallBack: () => void;
};

const AccountShowModal = ({ isOpen, data, closeCallBack }: Props) => {
  const handleOk = () => {
    closeCallBack();
  };

  return (
    <Modal
      title={data?.type}
      open={isOpen}
      onOk={handleOk}
      onCancel={closeCallBack}
    />
  );
};

export default AccountShowModal;
