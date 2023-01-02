const { User } = require('../models');
const { Op } = require('sequelize');

const email = '1231@@';
const nickname = '1231@@';
const hashPassword = '1231';

const insert = async () => {
  // db에 insert
  const result = await User.create({
    email,
    nickname,
    password: hashPassword,
  });

  console.log(result);
};

const select = async () => {
  const exUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { nickname }],
    },
  });

  console.log(exUser);
};

select();
