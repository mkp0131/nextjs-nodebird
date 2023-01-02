module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image", // Mysql 에서는 users 테이블이 생성, ✅ 모델은 대문자를 쓰는것은 시퀄라이저의 규칙이다.
    {
      // id 가 기본으로 들어있다.
      // createdAt, updatedAt 이 기본으로 들어있다.
      src: {
        type: DataTypes.STRING(200),
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
  Image.associate = (db) => {
    db.Image.belongsTo(db.User);
    db.Image.belongsTo(db.Post);
  };

  return Image;
};
