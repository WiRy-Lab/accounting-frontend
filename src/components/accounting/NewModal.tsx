import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Modal, Form, Input, DatePicker, Select, message } from 'antd';
import type { CategoryDTO } from '@/dto/CategoryDTO';
import type { AccountingCreateDTO } from '@/dto/AccountingDTO';
import $api from '@/plugins/api';

const { TextArea } = Input;

dayjs.extend(customParseFormat);

type Props = {
  isOpen: boolean;
  closeCallBack: () => void;
};

type FormValues = {
  date: string;
  type: string;
  category: string[];
  amount: number;
};

const AccountNewModal = ({ isOpen, closeCallBack }: Props) => {
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: FormValues) => {
    const data: AccountingCreateDTO = {
      ...values,
      date: dayjs(values.date).format('YYYY-MM-DD'),
      category: values.category.map((ele) => ({ name: ele })),
    };

    const result = await $api.accounting.create(data);

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

  const [category, setCategory] = useState<CategoryDTO[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await $api.category.all();

      setCategory(result.data);
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  return (
    <>
      {contextHolder}
      <Modal
        title="新增記帳"
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
            label="日期"
            name="date"
            rules={[{ required: true, message: 'Please select date!' }]}
            tooltip="This is a required field"
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              placeholder="日期"
            />
          </Form.Item>
          <Form.Item
            label="名稱"
            name="title"
            tooltip="This is a required field"
            rules={[{ required: true, message: 'Please enter title!' }]}
          >
            <Input autoComplete="false" placeholder="請輸入項目名稱" />
          </Form.Item>
          <Form.Item
            label="類型"
            name="type"
            rules={[{ required: true, message: 'Please select type!' }]}
            tooltip="This is a required field"
          >
            <Select placeholder="請選擇類型">
              <Select.Option value="income">收入</Select.Option>
              <Select.Option value="outcome">支出</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="分類"
            name="category"
            rules={[{ required: true, message: 'Please select category!' }]}
            tooltip="This is a required field"
          >
            <Select mode="multiple" placeholder="請選擇分類">
              {category.map((ele) => (
                <Select.Option value={ele.name} key={ele.id}>
                  {ele.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="金額"
            name="amount"
            rules={[{ required: true, message: 'Please enter number!' }]}
            tooltip="This is a required field"
          >
            <Input
              type="number"
              placeholder="請輸入金額"
              autoComplete="false"
            />
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            tooltip="進階描述，可輸入100字以內，選填"
          >
            <TextArea
              showCount
              maxLength={100}
              placeholder="請輸入進一步描述（選填）"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AccountNewModal;
