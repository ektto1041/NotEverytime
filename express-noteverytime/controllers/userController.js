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

module.exports = postJoin;
