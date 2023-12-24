import { Form, Input, message, Modal } from 'antd';
import React from 'react';

import type { CategoryCreateDTO } from '@/dto/CategoryDTO';
import $api from '@/plugins/api';

type Props = {
  isOpen: boolean;
  closeCallBack: () => void;
};

type FormValues = {
  name: string;
};

const CategoryNewModal = ({ isOpen, closeCallBack }: Props) => {
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: FormValues) => {
    const data: CategoryCreateDTO = {
      ...values,
    };

    const result = await $api.category.create(data);

    if (result.status === 201) {
      closeCallBack();
      form.resetFields();
      messageApi.open({
        type: 'success',
        content: 'Create success!',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Create failed!',
      });
    }
  };

  const onOk = () => {
    form.submit();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="編輯類別"
        open={isOpen}
        onOk={onOk}
        onCancel={closeCallBack}
        style={{ top: 20 }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            label="名稱"
            name="name"
            rules={[{ required: true, message: '請輸入名稱' }]}
          >
            <Input placeholder="請輸入類別名稱" autoComplete="false" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryNewModal;
