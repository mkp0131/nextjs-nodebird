import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  followRequestAction,
  unfollowRequestAction,
} from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispach = useDispatch();
  // 로딩 정보
  const { followLoading, unFollowLoading } = useSelector(
    (state) => state.user
  );
  // 현재 유저 정보
  const user = useSelector((state) => state.user.user);
  // 유저의 팔로우 리스트에 포스트의 팔로우가 있는지 확인
  const isFollowing = user.Followings.find((following) => {
    return following.id === post.UserId;
  });

  const onClick = useCallback(() => {
    // 팔로우 라면
    if (isFollowing) {
      dispach(unfollowRequestAction({ id: post.User.id }));
    } else {
      dispach(followRequestAction({ id: post.User.id }));
    }
  }, [isFollowing]);

  return (
    <div style={{ padding: '5px 0' }}>
      <Button
        onClick={onClick}
        type={isFollowing && 'primary'}
        loading={followLoading || unFollowLoading}
      >
        {isFollowing ? '언팔로우' : '팔로우'}
      </Button>
    </div>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
