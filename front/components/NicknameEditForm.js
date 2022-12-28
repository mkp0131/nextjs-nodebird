import { Form, Input } from 'antd';

const { Search } = Input;

const NicknameEditForm = () => {
  return (
    <Form>
      <Search
        addonBefore="닉네임"
        // placeholder="input search text"
        allowClear
        enterButton="수정"
        size="large"
        // onSearch={onSearch}
      />
    </Form>
  );
};

export default NicknameEditForm;
