import { Comment } from '@ant-design/compatible';
import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, List, Popover } from 'antd';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  likePostAction,
  removePostAction,
  unlikePostAction,
} from '../reducers/post';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';

const PostCard = ({ post }) => {
  const [commentToggle, setCommentToggle] = useState(false);
  const { user, isLoggedIn } = useSelector(
    (state) => state.user
  );
  const { removePostLoading, addCommentError } =
    useSelector((state) => state.post);
  const id = user?.id;
  const dispach = useDispatch();

  const onToggleComment = useCallback(() => {
    setCommentToggle((prev) => !prev);
  }, []);

  const onClickPostDelete = useCallback(() => {
    dispach(removePostAction(post.id));
  }, []);

  const liked = post.Liker.find((like) => like.id === id);

  const onLike = useCallback(() => {
    dispach(likePostAction(post.id));
  }, []);

  const onUnlike = useCallback(() => {
    dispach(unlikePostAction(post.id));
  }, []);

  const alertLogin = useCallback(() => {
    alert('로그인이 필요합니다.');
  }, []);

  return (
    <div>
      <Card
        cover={
          post.Images[0] && (
            <PostImages images={post.Images} />
          )
        }
        extra={
          id &&
          id !== post.UserId && <FollowButton post={post} />
        }
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              key="heart"
              onClick={id ? onUnlike : alertLogin}
            />
          ) : (
            <HeartOutlined
              key="heart"
              onClick={id ? onLike : alertLogin}
            />
          ),
          <MessageOutlined
            key="comment"
            onClick={onToggleComment}
          />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && id === post.User.id && (
                  <>
                    <Button>수정</Button>
                    <Button
                      onClick={onClickPostDelete}
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </>
                )}
                <Button>신고</Button>
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname}</Avatar>}
          title={post.User.nickname}
          description={
            <PostCardContent postContent={post.content} />
          }
        />
      </Card>
      {commentToggle && (
        <div>
          {user && <CommentForm post={post} />}
          <List
            header={`${post.Comments.length} 개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Avatar>{item.User.nickname}</Avatar>
                  }
                  content={item.content}
                />
              </li>
            )}
          ></List>
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    // JSON 형식(세부적인 타입지정 X)
    Comment: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
