import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Spin, Typography } from 'antd';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import type { RegisterDTO } from '@/dto/AuthDTO';
import AuthLayout from '@/layouts/AuthLayout';
import $api from '@/plugins/api';

const { Title } = Typography;

const Register = () => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: RegisterDTO) => {
    setLoading(true);
    const res = await $api.auth.register(values);

    if (res.status === 201) {
      messageApi.open({
        type: 'success',
        content: 'Register success!',
      });
      router.push('/api/auth/signin');
    } else {
      messageApi.open({
        type: 'error',
        content: 'Please check your input!',
      });
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {contextHolder}
      <Head>
        <title>Register</title>
      </Head>
      <main>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin spinning={loading} tip="Loading...">
            <Card style={{ width: 500, margin: '10px' }}>
              <Title
                level={3}
                style={{ margin: '0px 0px 20px 0px', textAlign: 'center' }}
              >
                <Image
                  src="/images/logo-black.png"
                  alt="Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '70%', height: 'auto', margin: '20px auto' }}
                />
              </Title>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
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

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                    size="large"
                  >
                    註冊
                  </Button>
                  <Button
                    type="link"
                    size="large"
                    block
                    onClick={() => {
                      router.push('/api/auth/signin');
                    }}
                  >
                    登入
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Spin>
        </div>
      </main>
    </AuthLayout>
  );
};

export default Register;
