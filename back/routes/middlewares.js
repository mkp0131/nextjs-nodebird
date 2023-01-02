exports.isLoggedIn = (req, res, next) => {
  // req.isAuthenticated(): passport 에서 제공하는 메소드
  // 로그인 유무를 확인
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  // req.isAuthenticated(): passport 에서 제공하는 메소드
  // 로그인 유무를 확인
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('회원은 사용이 불가합니다.');
  }
};
