import { DatePicker, Form, Input, message, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useState } from 'react';

import type { AccountingUpdateDTO } from '@/dto/AccountingDTO';
import type { CategoryDTO } from '@/dto/CategoryDTO';
import $api from '@/plugins/api';

const { TextArea } = Input;

dayjs.extend(customParseFormat);

type Props = {
  isOpen: boolean;
  id: number;
  closeCallBack: () => void;
};

type FormValues = {
  id: number;
  date: Date;
  type: string;
  category: string[];
  amount: number;
  description: string;
};

const AccountEditModal = ({ isOpen, id, closeCallBack }: Props) => {
  const [form] = Form.useForm();

  const [data, setData] = useState<FormValues>();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: FormValues) => {
    const formData: AccountingUpdateDTO = {
      ...values,
      date: dayjs(values.date).format('YYYY-MM-DD'),
      category: values.category.map((ele) => ({ name: ele })),
    };

    const result = await $api.accounting.update(formData.id, formData);

    if (result) {
      closeCallBack();
      form.resetFields();
      messageApi.open({
        type: 'success',
        content: 'Update success!',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Update failed!',
      });
    }
  };

  const onOk = () => {
    form.submit();
  };

  const [category, setCategory] = useState<CategoryDTO[] | []>([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const result = await $api.category.all();

      setCategory(result.data);
    };

    const fetchData = async () => {
      const result = await $api.accounting.show(id);

      if (result.status === 200) {
        const formInitData: FormValues = {
          ...result.data,
          date: dayjs(result.data.date, 'YYYY-MM-DD'),
          category: result.data.category.map((ele: CategoryDTO) => ele.name),
        };

        setData(formInitData);
      } else {
        messageApi.open({
          type: 'error',
          content: 'Fetch failed!',
        });
      }
    };

    if (isOpen) {
      fetchCategoryData();
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
        title="編輯記帳"
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
          initialValues={data}
        >
          <Form.Item name="id" hidden>
            <Input type="number" />
          </Form.Item>
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

export default AccountEditModal;
