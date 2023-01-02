module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag", // Mysql 에서는 users 테이블이 생성, ✅ 모델은 대문자를 쓰는것은 시퀄라이저의 규칙이다.
    {
      // id 가 기본으로 들어있다.
      // createdAt, updatedAt 이 기본으로 들어있다.
      name: {
        type: DataTypes.STRING(20),
        allowNull: false, // 필수
      },
    },
    {
      // 한글저장 이모지 저장
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  // 관계설정
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };

  return Hashtag;
};
