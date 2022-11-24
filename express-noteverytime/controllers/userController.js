const User = require("../models/user/user");

const isDuplicated = async (db, field) => {
  const existField = await db.exists({ field });
  if (existField !== null) {
    console.log(`${field} already exists`);
    return true;
  }
  return false;
}

const isEmpty = (field) => field === '' || field === undefined;

const postJoin = async (req, res) => {
  const { accountId, password, username, email, isAuth, profileImage } = req.body;
    
  if (isEmpty(accountId)) {
    return res.status(409).send("please input id");
  } else if (isEmpty(password)) {
    return res.status(409).send("please input password");
  } else if (isEmpty(username)) {
    return res.status(409).send("please input username");
  } else if (isEmpty(email)) {
    return res.status(409).send("please input email");
  }

  if (await isDuplicated(User, accountId)) {
    return res.status(409).send("id already exists");
  } else if (await isDuplicated(User, username)) {
    return res.status(409).send("username already exists");
  } else if (await isDuplicated(User, email)) {
    return res.status(409).send("email already exists");
  }

  try {
    await User.create({
      accountId,
      password,
      username,
      email,
      isAuth,
      profileImage,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.message);
  }
};

const getLogin = async (req, res) => {
  return res.status(200).send("get login");
};

const postLogin = async (req, res) => {
  const { accountId, password } = req.body;
  try {
    if (isEmpty(accountId)) {
      throw new Error("아이디를 입력해주세요.");
    }
    if (isEmpty(password)) {
      throw new Error("비밀번호를 입력해주세요.");
    }
    const user = await User.findOne({accountId, password});
    if (!user) {
      return res.status(400).send("등록되지 않은 ID 또는 PW입니다.");
    }
    req.session.user = user;
    req.session.isLogined = true;
    let session = req.session;
    return res.status(200).send(session);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  postJoin,
  getLogin,
  postLogin
};
