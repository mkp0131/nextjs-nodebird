import { Button, Form, Input } from 'antd';
import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAction } from '../reducers/post';

const { TextArea } = Input;

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.user?.id);
  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    if (addCommentDone) {
      // 폼을 리셋한다.
      form.resetFields();
    }
  }, [addCommentDone]);

  const onFinish = useCallback((values) => {
    dispatch(
      addCommentAction({
        content: values.new_comment,
        postId: post.id,
        userId: id,
      })
    );
  }, []);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="댓글 작성"
        name="new_comment"
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
        <Button
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          글 작성
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
