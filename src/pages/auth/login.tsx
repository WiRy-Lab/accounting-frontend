import React from 'react';
import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import type { LoginDTO } from '@/dto/AuthDTO';
import { signIn } from 'next-auth/react';

const { Title } = Typography;

const Login = () => {
  const onFinish = async (values: LoginDTO) => {
    await signIn('credentials', {
      ...values,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <AuthLayout>
      <Head>
        <title>Login</title>
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
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </main>
    </AuthLayout>
  );
};

export default Login;
