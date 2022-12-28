import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  // 권한없을시 페이지 막기 START
  useEffect(() => {
    if (!(user && user.id)) {
      Router.push('/');
    }
  }, [user, user?.id]);
  if (!user) {
    return null;
  }
  // 권한없을시 페이지 막기 END

  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로워 목록"
          data={user.Followers}
        />
        <FollowList
          header="팔로잉 목록"
          data={user.Followings}
        />
      </AppLayout>
    </>
  );
};

export default Profile;
