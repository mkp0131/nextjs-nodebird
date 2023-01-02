const passport = require('passport');
const { User } = require('../models');
// 아이디 비밀번호 인증 로직을 import
const local = require('./local');

module.exports = () => {
  /*
   * ✅ 세션에 모두 다 들고있기에 무겁기 때문에 user.id 만 따로 저장
   * 필요할때마다 db에서 회원정보를 가져온다.
   */

  // 회원의 id 만 가지고 있는다.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // serializeUser 에서 실행한 done 이 실행된다.
  // 가지고 있는 회원 id 로 데이터를 다시 조회한다.
  // 로그인 한 후로는 라우터가 실행되기전에 매번 실행된다.
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user 에 저장
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  // 아이디 비밀번호 인증 로직을 실행
  local();
};
