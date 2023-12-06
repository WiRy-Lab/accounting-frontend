import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

type Props = {
  data: DataType | null;
};

const AccountShowModal = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (data == null) {
      return;
    }
    setIsModalOpen(true);
  }, [data]);

  return (
    <Modal
      title={data?.name}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {data?.tags}
    </Modal>
  );
};

export default AccountShowModal;
