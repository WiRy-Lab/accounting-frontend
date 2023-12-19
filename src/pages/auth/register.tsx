import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import type { RegisterDTO } from '@/dto/AuthDTO';
import AuthLayout from '@/layouts/AuthLayout';
import $api from '@/plugins/api';

const { Title } = Typography;

const Register = () => {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: RegisterDTO) => {
    const res = await $api.auth.register(values);

    if (res && res.status === 200) {
      router.push('/api/auth/login');
    } else {
      messageApi.open({
        type: 'error',
        content: 'Please check your input!',
      });
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
          <Card style={{ width: 500, margin: '10px' }}>
            <Title
              level={3}
              style={{ margin: '0px 0px 20px 0px', textAlign: 'center' }}
            >
              Login
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
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Register
                </Button>
                Or <a href="">login now!</a>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </main>
    </AuthLayout>
  );
};

export default Register;
