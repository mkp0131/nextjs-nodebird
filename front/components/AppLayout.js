import Link from 'next/link';
import PropTypes from 'prop-types';

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Input, Menu, Row } from 'antd';
import { useState } from 'react';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const SearchForm = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e.key);
    setCurrent(e.key);
  };
  const onSearch = (value) => console.log(value);

  // 리덕스에서 값을 가져온다.
  const user = useSelector((state) => state.user.user);

  // 메뉴 구성
  const items = [
    {
      label: (
        <Link href={' / '}>
          <a>노드버드</a>
        </Link>
      ),
      key: 'home',
      icon: <MailOutlined />,
    },
    {
      label: (
        <Link href={'/signup'}>
          <a>회원가입</a>
        </Link>
      ),
      key: 'signup',
      icon: <AppstoreOutlined />,
    },
    {
      label: (
        <Link href={'/profile'}>
          <a>프로필</a>
        </Link>
      ),
      key: 'profile',
      icon: <AppstoreOutlined />,
    },
    {
      label: (
        <SearchForm
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      ),
      key: 'alipay',
    },
  ];

  return (
    <div>
      <div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Row gutter={10}>
          <Col sm={24} md={6}>
            {user ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col sm={24} md={18}>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
};

AppLayout.protoType = {
  // React Node (필수 항목)
  children: PropTypes.node.isRequired,
};

export default AppLayout;
