const Sequelize = require("sequelize");
// 개발환경에 맞는 설정 가져오기 START
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
// 개발환경에 맞는 설정 가져오기 END
const db = {};

// 시퀄라이즈 Instance 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./user")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
