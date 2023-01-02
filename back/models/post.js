module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', // Mysql 에서는 users 테이블이 생성, ✅ 모델은 대문자를 쓰는것은 시퀄라이저의 규칙이다.
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
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  // 관계설정
  Post.associate = (db) => {
    // 관계메서드가 생성된다.
    // add, remove, set, get
    // [관계] post.addUser,
    // [관계] post.getUser,
    // [관계] post.removeUser,
    db.Post.belongsTo(db.User);
    // [관계] post.addComment
    // [관계] post.getComment
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    // [관계]
    db.Post.belongsToMany(db.Hashtag, {
      through: 'PostHashtag',
    });
    // [관계] post.addLiker: 좋아요 유저 추가
    // [관계] post.removeLiker: 좋아요 유저 제거
    db.Post.belongsToMany(db.User, {
      through: 'Like',
      as: 'Liker',
    });
    // [관계] post.addRetweet
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
  };

  return Post;
};
