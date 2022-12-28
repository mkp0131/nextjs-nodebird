import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const { Meta } = Card;

const UserProfile = () => {
  const dispatch = useDispatch();
  const onClickLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const { isLoggingOut, user } = useSelector(
    (state) => state.user
  );

  return (
    <Card
      actions={[
        <div key={'twit'}>
          트윗
          <br />
          {user?.Posts?.length || 0}
        </div>,
        <div key={'following'}>
          팔로잉
          <br />
          {user?.Followings?.length || 0}
        </div>,
        <div key={'follow'}>
          팔로워
          <br />
          {user?.Followers?.length || 0}
        </div>,
      ]}
    >
      <Meta
        avatar={<Avatar>{user.nickname}</Avatar>}
        title={user.nickname}
        description={
          <Button
            onClick={onClickLogout}
            loading={isLoggingOut}
          >
            로그아웃
          </Button>
        }
      />
    </Card>
  );
};

export default UserProfile;
