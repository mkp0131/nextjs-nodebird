/*
 * 많이 사용하는 컬럼의 타입
 * STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
 * https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', // Mysql 에서는 users 테이블이 생성, ✅ 모델은 대문자를 쓰는것은 시퀄라이저의 규칙이다.
    {
      // id 가 기본으로 들어있다.
      // createdAt, updatedAt 이 기본으로 들어있다.
      email: {
        type: DataTypes.STRING(30),
        unique: true, // 고유값
        allowNull: false, // 필수
      },
      nickname: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      // 한글저장 이모지 저장
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  // 관계설정
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 한명의 유저가 많은 글을 가질수있다.
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, {
      through: 'Like',
      as: 'Liker',
    });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreingKey: 'FollowingId',
    });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreingKey: 'FollowerId',
    });
  };

  return User;
};
