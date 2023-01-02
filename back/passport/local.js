const passport = require('passport');
// Strategy 라는 변수명이 많아질수 있기에 alias 를 해준다.
const {
  Strategy: LocalStrategy,
} = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        // input[name] 을 적어준다.
        // 아이디 name 명 지정
        usernameField: 'email',
        // 비밀번호 name 명 지정
        passwordField: 'password',
      },
      // 위의 네임명을 기반으로 인자를 생성
      async (email, password, done) => {
        try {
          // 유저가 있는지 확인
          const user = await User.findOne({
            where: {
              email,
            },
          });
          // 유저가 없다면
          if (!user) {
            // done(서버에러[try catch 에러], 성공시 데이터, 클라이언트 에러);
            return done(null, false, {
              reason: '아이디가 없습니다.',
            });
          }

          const checkPassword = await bcrypt.compare(
            password,
            user.password
          );

          if (checkPassword) {
            // 로그인 성공시: 성공 파라미터에 user 정보를 넘겨준다.
            return done(null, user);
          }
          // 비밀번호가 틀렸을시
          return done(null, false, {
            reason: '비밀번호가 틀렸습니다.',
          });
        } catch (error) {
          console.error(error);
          // 서버에러를 넘겨준다.
          done(error);
        }
      }
    )
  );
};
