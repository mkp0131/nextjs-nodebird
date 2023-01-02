import { Input } from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNicknameAction } from '../reducers/user';

const { Search } = Input;

const NicknameEditForm = () => {
  const dispach = useDispatch();
  const nickname = useSelector(
    (state) => state.user?.user.nickname
  );

  const onFinish = useCallback((values) => {
    dispach(changeNicknameAction(values));
  }, []);

  return (
    <Search
      addonBefore="닉네임"
      // placeholder="input search text"
      allowClear
      enterButton="수정"
      size="large"
      onSearch={(values) => onFinish({ nickname: values })}
      defaultValue={nickname}
    />
  );
};

export default NicknameEditForm;
