import { Button, Form, Input } from 'antd';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const onFinish = useCallback((values) => {
    console.log('Success:', values);
    const { username, password } = values;
    dispatch(loginRequestAction({ username, password }));
  }, []);
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };
  const { isLoggingIn } = useSelector(
    (state) => state.user
  );

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
        <Button htmlType="button">회원가입</Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
