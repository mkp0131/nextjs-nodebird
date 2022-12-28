import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { loadPostAction } from '../reducers/post';

const Seperater = styled.div`
  padding-top: 20px;
`;

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostLoading } =
    useSelector((state) => state.post);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPostAction(5));
  }, []);

  // 무한 스크롤 START
  useEffect(() => {
    const onScroll = () => {
      /*
       * window.scrollY, // 스크롤된 양
       * document.documentElement.clientHeight, // 유저가 보는 문서의 높이
       * document.documentElement.scrollHeight // 전체 문서 높이
       */
      if (
        hasMorePost &&
        !loadPostLoading &&
        window.scrollY +
          document.documentElement.clientHeight +
          300 >
          document.documentElement.scrollHeight
      ) {
        dispatch(loadPostAction(5));
      }
    };
    window.addEventListener('scroll', onScroll);
    // 컴포넌트 언마운트시 이벤트 제거
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost]);
  // 무한 스크롤 END

  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => (
        <div key={post.id}>
          <PostCard post={post} />
          <Seperater />
        </div>
      ))}
    </AppLayout>
  );
};

export default Home;
