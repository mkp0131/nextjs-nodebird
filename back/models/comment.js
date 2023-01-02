module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment", // Mysql 에서는 users 테이블이 생성, ✅ 모델은 대문자를 쓰는것은 시퀄라이저의 규칙이다.
    {
      // id 가 기본으로 들어있다.
      // createdAt, updatedAt 이 기본으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // 필수
      },
    },
    {
      // 한글저장 이모지 저장
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }

    /* ✅ associate 에 선언한 것중 belengsTo 로 선언된 것이 컬럼으로 생성된다.
     * UserId: {}
     * PostId: {}
     */
  );

  // 관계설정
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };

  return Comment;
};
