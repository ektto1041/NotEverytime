/** @format */

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/user/user");
const UserLecture = require("../models/user/userLecture");
const UserEmailAuth = require("../models/user/userEmailAuth");
const Lecture = require("../models/lecture/lecture");
const LectureDetail = require("../models/lecture/lectureDetail");
const authLecture = require("../models/authLecture.json");

const currentSemester = "2022-2";
const isEmpty = (field) => field === "" || field === undefined;

const postJoin = async (req, res, next) => {
  const { accountId, password, username, email } = req.body;
  const isAuth = false;
  const profileImage = process.env.DEFAULT_PROFILE_IMAGE;

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
    
    let userEmailAuth = await UserEmailAuth.create({
      userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    });
    req.email = email;
    req.token = userEmailAuth.token;
    next();
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
    let user = await User.findOne({ accountId });
    let isPasswordRight = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordRight) {
      return res.status(400).send("등록되지 않은 ID 또는 PW입니다.");
    }
    else if (!user.isAuth) {
      return res.status(401).send("'Your Email has not been verified.");
    } else {
      user = user.toObject();
      delete user['password'];
      req.session.user = user;
      req.session.isLogined = true;
      let session = req.session;
      return res.status(200).send(session);
    }
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

const getProfile = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const userId = req.session.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("등록되지 않은 ID 또는 PW입니다.");
    }
    const profileImage = user.profileImage ? user.profileImage : process.env.DEFAULT_PROFILE_IMAGE;
    return res.status(200).send({profileImage});
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

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
    };
    let userLecture = await UserLecture.findOne({ userId });
    if (!userLecture) {
      return res.status(200).send({ userResult });
    }
    let lectures = [];
    for (let lectureDetail of userLecture.lectureDetailId) {
      let lecture = await LectureDetail.findById(lectureDetail).populate(
        "lectureId"
      );
      if (!lecture) {
        throw new Error("해당하는 lectureDetail 정보가 없습니다.");
      } else {
        lecture = lecture.toObject();
        lecture["lecture"] = lecture["lectureId"];
        delete lecture["lectureId"];
        lectures.push(lecture);
      }
    }
    return res.status(200).send({ userResult, lectures });
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

const editMypageProfile = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const userId = req.session.user._id;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { profileImage: req.file.location },
      },
      { new: true }
    ).exec();
    req.session.user = updatedUser;
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getAuthLecture = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  return res.status(200).send(authLecture);
};

const postAuthLecture = async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("세션 없음");
  }
  const userId = req.session.user._id;
  let authLectureData = req.body;
  if (!authLectureData) {
    return res.status(400).send("인증할 수강정보가 없습니다.");
  }
  try {
    /**
     * 1. 유저의 인증학기로 받은 데이터 필터링
     * 2. 받은 데이터의 강의+교수님이 lecutre에 있는지 확인 (원래 서비스라면, 가지고 있어야함)
     * 3. 받은 데이터의 학기+과목코드+강의시간이 lectureDetail에 있는지 확인 (원래 서비스라면, 가지고 있어야함)
     * 4. userLecture에 lectuerDetailId를 추가
     */

    let userLecture = await UserLecture.findOne({ userId }).select(
      "userAuthSemeter"
    );
    if (userLecture && userLecture.userAuthSemeter) { // 이미 수강인증한 학기가 있는 경우
      if (userLecture.userAuthSemeter === currentSemester) {
        return res.status(400).send("이미 수강인증되었습니다.");
      }
      authLectureData = authLectureData.filter(
        (lecture) => lecture.lectureSemester > userLecture.userAuthSemeter
      );
    }

    let lectureDetails = [];
    for (let data of authLectureData) {
      let lectureId = await Lecture.find({
        lectureName: data.lectureName,
        lectureProfessor: data.lectureProfessor,
      });
      let lectureDetail = await LectureDetail.findOne({
        lectureId,
        lectureSemester: data.lectureSemester,
        lectureCode: data.lectureCode,
        lectureTime: data.lectureTime,
      });
      if (!lectureDetail) {
        return res.status(500).send("강의 정보가 DB에 없습니다.");
      } else {
        lectureDetails.push(lectureDetail._id);
      }
    }

    let updateUserLecture = {};
    if (!userLecture) { // 수강 인증한 학기가 아예 없는 경우 userLecture document 새로 생성
      updateUserLecture = await UserLecture.create({
        userId,
        lectureDetailId: lectureDetails,
        userAuthSemeter: currentSemester,
      });
    } else {
      updateUserLecture = await UserLecture.findByIdAndUpdate(
        userLecture._id,
        {
          $push: { lectureDetailId: lectureDetails },
          userAuthSemeter: currentSemester,
        },
        { new: true }
      ).exec();
    }

    return res.status(200).send(updateUserLecture);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  postJoin,
  getLogin,
  postLogin,
  getLogout,
  getProfile,
  getMypage,
  editMypage,
  editMypageProfile,
  getAuthLecture,
  postAuthLecture,
};
