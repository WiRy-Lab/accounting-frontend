import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, message, Modal } from 'antd';
import { signOut, useSession } from 'next-auth/react';

import type { RegisterDTO } from '@/dto/AuthDTO';
import $api from '@/plugins/api';

type Props = {
  isOpen: boolean;
  closeCallBack: () => void;
};

const EditProfile = ({ isOpen, closeCallBack }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { data: session } = useSession();

  const { user } = session || {};

  const [form] = Form.useForm();

  const onOk = () => {
    form.submit();
  };

  const onFinish = async (values: RegisterDTO) => {
    const result = await $api.auth.update(values);

    if (result.status === 200) {
      messageApi.open({
        type: 'success',
        content: 'Update success!',
      });
      closeCallBack();
      localStorage.removeItem('token');
      signOut();
    } else {
      messageApi.open({
        type: 'error',
        content: 'Update failed!',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="修改資料"
        open={isOpen}
        onOk={onOk}
        onCancel={closeCallBack}
        style={{ top: 20 }}
      >
        <Form
          form={form}
          initialValues={{
            name: user?.name,
            email: user?.email,
            account: user?.account,
          }}
          onFinish={onFinish}
          layout="vertical"
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input
              type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="account"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password_verify"
            rules={[
              {
                required: true,
                message: 'Please input your Password angin!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password again"
              size="large"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProfile;
