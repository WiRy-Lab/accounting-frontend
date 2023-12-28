import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Spin, Typography } from 'antd';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import React from 'react';

import type { LoginDTO } from '@/dto/AuthDTO';
import AuthLayout from '@/layouts/AuthLayout';

const { Title } = Typography;

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: LoginDTO) => {
    setLoading(true);
    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/',
    });

    if (result && result.ok) {
      router.push((router.query.callbackUrl as string) || '/');
    } else {
      messageApi.open({
        type: 'error',
        content: 'Login failed!',
      });
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {contextHolder}
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
          <Spin spinning={loading} tip="Loading...">
            <Card style={{ width: 500 }}>
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
                    size="large"
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
                    size="large"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    style={{ marginBottom: '10px' }}
                  >
                    登入
                  </Button>
                  <Button
                    type="link"
                    size="large"
                    block
                    onClick={() => {
                      router.push('/auth/register');
                    }}
                  >
                    註冊
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

export default Login;
