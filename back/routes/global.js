const express = require('express');
// ✅ User 테이블을 선택
const { User } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const passport = require('passport');
const user = require('../models/user');
const db = require('../models');
const {
  isNotLoggedIn,
  isLoggedIn,
} = require('./middlewares');

const globalRouter = express.Router();

globalRouter.route('/').get((req, res) => {
  return res.send('hello');
});

// 로그인
// passport 를 사용
globalRouter
  .route('/login')
  .all(isNotLoggedIn)
  .post((req, res, next) => {
    passport.authenticate(
      // 아이디, 비밀번호 인증 로직
      'local',
      // passport 의 done 함수 전달
      (serverError, successData, clientError) => {
        if (serverError) {
          console.error(serverError);
          return next(serverError);
        }
        if (clientError) {
          return res.status(401).send(clientError.reason);
        }

        // passport 에서 부여해주는 메소드 login
        return req.login(
          successData,
          async (loginError) => {
            // 패스포트 에러 처리(에러 날일이 없다고 한다...)
            if (loginError) {
              console.error(loginError);
              return next(loginError);
            }

            try {
              const fullUserWithoutPassword =
                await User.findOne({
                  where: {
                    id: successData.id,
                  },
                  // 원하는 것만 가져오기
                  // attributes: ['id', 'nickname', 'email'],
                  // 해당필드만 빼고 가져오기
                  attributes: {
                    exclude: ['password'],
                  },
                  // Join 문
                  include: [
                    {
                      model: db.Post,
                      attributes: ['id'],
                    },
                    {
                      model: db.User,
                      // DB INIT 시 별칭
                      as: 'Followers',
                      attributes: ['id'],
                    },
                    {
                      model: db.User,
                      as: 'Followings',
                      attributes: ['id'],
                    },
                  ],
                });
              return res.json(fullUserWithoutPassword);
            } catch (error) {
              console.error(error);
              next(error);
            }

            // 프론트에 사용자 정보를 넘겨준다.
          }
        );
      }
    )(req, res, next);
  });

globalRouter
  .route('/logout')
  .all(isLoggedIn)
  .post((req, res, next) => {
    req.logout((err) => {
      req.session.destroy();
      if (err) {
        next(err);
      } else {
        res.status(200).send('server ok: 로그아웃 완료');
      }
    });

    // req.logOut();
    // req.session.destroy();
    // res.send('logout');
  });

module.exports = globalRouter;
