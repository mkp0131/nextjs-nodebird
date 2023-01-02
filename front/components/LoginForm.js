import { Button, Form, Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';
import Router from 'next/router';

const LoginForm = () => {
  const dispatch = useDispatch();
  const onFinish = useCallback((values) => {
    const { email, password } = values;
    dispatch(loginRequestAction({ email, password }));
  }, []);
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };
  const { isLoggingIn, loginError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (loginError) {
      setTimeout(() => {
        alert(loginError);
      }, 1);
    }
  }, [loginError]);

  return (
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
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoggingIn}
        >
          로그인
        </Button>
        <Button
          htmlType="button"
          onClick={() => {
            Router.push('/signup');
          }}
        >
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
