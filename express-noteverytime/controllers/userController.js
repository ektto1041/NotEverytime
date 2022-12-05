/** @format */

const User = require("../models/user/user");
const UserLecture = require("../models/user/userLecture");
const Lecture = require("../models/lecture/lecture");
const LectureDetail = require("../models/lecture/lectureDetail");

const isEmpty = (field) => field === "" || field === undefined;
const postJoin = async (req, res) => {
  const { accountId, password, username, email, isAuth, profileImage } =
    req.body;
    
  if (isEmpty(accountId)) {
    return res.status(409).send("please input id");
  } else if (isEmpty(password)) {
    return res.status(409).send("please input password");
  } else if (isEmpty(username)) {
    return res.status(409).send("please input username");
  } else if (isEmpty(email)) {
    return res.status(409).send("please input email");
  }

  if (await User.exists({ accountId })) {
    return res.status(409).send("id already exists");
  } else if (await User.exists({ username })) {
    return res.status(409).send("username already exists");
  } else if (await User.exists({ email })) {
    return res.status(409).send("email already exists");
  }

  try {
    let user = await User.create({
      accountId,
      password,
      username,
      email,
      isAuth,
      profileImage,
    });
    return res.status(200).send(user);
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
    const user = await User.findOne({ accountId, password });
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

const getLogout = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  req.session.destroy();
  res.status(200).send("세션 삭제");
};

const getMypage = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const userId = req.session.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("등록되지 않은 ID 또는 PW입니다.");
    }
    let userResult = {
      _id: user._id,
      accountId: user.accountId,
      username: user.username,
      email: user.email,
      isAuth: user.isAuth,
      profileImage: user.profileImage,
    }
    let userLecture = await UserLecture.findOne({ userId });
    if (!userLecture) {
      return res.status(200).send({userResult});
    }
    let lectures = [];
    for (let lectureDetail of userLecture.lectureDetailId) {
      let lecture = await LectureDetail.findById(lectureDetail).populate("lectureId");
      if (!lecture) {
        throw new Error("해당하는 lectureDetail 정보가 없습니다.");
      } else {
        lectures.push(lecture);
      }
    }
    return res.status(200).send({userResult, lectures});
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const editMypage = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const userId = req.session.user._id;
  const userUpdateInfo = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: userUpdateInfo,
      },
      { new: true }
    ).exec();
    req.session.user = updatedUser;
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  postJoin,
  getLogin,
  postLogin,
  getLogout,
  getMypage,
  editMypage,
};
