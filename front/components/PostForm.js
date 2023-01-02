import {
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPostAction } from '../reducers/post';

const { TextArea } = Input;

const PostForm = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const addPostError = useSelector(
    (state) => state.post.addPostError
  );

  const dispatch = useDispatch();

  const onFinish = useCallback((values) => {
    dispatch(addPostAction(values));
    // 폼을 리셋한다.
    form.resetFields();
  }, []);

  useEffect(() => {
    if (addPostError) {
      setTimeout(() => {
        alert(addPostError);
      }, 1);
    }
  }, [addPostError]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="글 작성"
        name="new_post"
        rules={[
          {
            required: true,
            message: '글을 입력해주세요.',
          },
        ]}
      >
        <TextArea rows={4} placeholder="maxLength is 6" />
      </Form.Item>

      <Form.Item>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          // beforeUpload={beforeUpload}
          // onChange={handleChange}
        >
          {/* {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{ width: '100%' }}
            />
          ) : ( */}
          {uploadButton}
          {/* )} */}
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          글 작성
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
