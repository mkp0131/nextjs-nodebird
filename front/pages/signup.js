import { Button, Checkbox, Form, Input } from 'antd';
import Head from 'next/head';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { signupRequestAction } from '../reducers/user';
import Router from 'next/router';

const Signup = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupDone, signupError, user } =
    useSelector((state) => state.user);

  // 회원가입이 끝나면 리다이렉트
  useEffect(() => {
    if (signupDone) {
      Router.push('/');
    }
  }, [signupDone]);

  // 회원정보가 있으면 리다이렉트
  useEffect(() => {
    if (user) {
      Router.push('/');
    }
  }, []);

  useEffect(() => {
    if (signupError) {
      setTimeout(() => {
        alert(signupError);
      }, 1);
    }
  }, [signupError]);

  const onFinish = useCallback((values) => {
    dispatch(signupRequestAction(values));
  }, []);

  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <AppLayout>
        <Form
          layout="vertical"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="이메일"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="비밀번호 확인"
            name="passwordCheck"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="닉네임"
            name="nickname"
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
            rules={[
              {
                required: true,
                message: '약관에 동의 해주세요.',
              },
            ]}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={signupLoading}
            >
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </AppLayout>
    </>
  );
};

export default Signup;
