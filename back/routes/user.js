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

const userRouter = express.Router();

// 회원가입
userRouter
  .route('/')
  .all(isNotLoggedIn)
  .post(async (req, res, next) => {
    const { email, nickname, password } = req.body;

    try {
      // 사용자가 있는지 db조회
      // 없다면 null 이 나온다.
      const exUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { nickname }],
        },
      });

      if (exUser) {
        return res
          .status(403)
          .send('이미 사용중인 사용자 입니다.');
      }

      const hashPassword = await bcrypt.hash(password, 5);

      // db에 insert
      await User.create({
        email,
        nickname,
        password: hashPassword,
      });

      return res.send('ok');
    } catch (error) {
      console.error(error);
      // next 에서 에러를 한번에 보내준다.
      next(error);
    }
  });

// 로그인 정보 확인
userRouter.route('/myInfo').get(async (req, res, next) => {
  const userId = req.user?.id;
  try {
    if (userId) {
      const fullUserWithoutPassword = await User.findOne({
        where: {
          id: userId,
        },
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

      return res.status(200).json(fullUserWithoutPassword);
    }
    // 로그인 정보가 없을시 null 리턴
    else {
      return res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

userRouter
  .route('/nickname')
  .patch(isLoggedIn, async (req, res, next) => {
    try {
      const new_nickname = req.body.nickname;
      await User.update(
        {
          nickname: new_nickname,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      res.json({ nickname: new_nickname });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = userRouter;
