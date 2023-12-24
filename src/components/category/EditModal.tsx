import { Form, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import type { CategoryDTO } from '@/dto/CategoryDTO';
import $api from '@/plugins/api';

type Props = {
  isOpen: boolean;
  id: number;
  closeCallBack: () => void;
};

const CategoryEditModal = ({ isOpen, id, closeCallBack }: Props) => {
  const [form] = Form.useForm();

  const [data, setData] = useState<CategoryDTO>();

  const [messageApi, contextHolder] = message.useMessage();

  const onOk = () => {
    form.submit();
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await $api.category.show(id);

      setData(result.data);
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, id, messageApi]);

  useEffect(() => {
    if (isOpen && data) {
      form.setFieldsValue(data);
    }
  }, [isOpen, data, form]);

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
          layout="vertical"
          style={{ marginTop: '20px' }}
          initialValues={data}
          onFinish={async (values) => {
            const result = await $api.category.update(id, values);

            if (!result) {
              messageApi.open({
                type: 'error',
                content: 'Update failed!',
              });

              return;
            }

            messageApi.open({
              type: 'success',
              content: 'Update success!',
            });

            closeCallBack();
          }}
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

export default CategoryEditModal;
