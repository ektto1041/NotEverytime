/** @format */

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/user/user");
const UserLecture = require("../models/user/userLecture");
const UserEmailAuth = require("../models/user/userEmailAuth");
const Lecture = require("../models/lecture/lecture");
const LectureDetail = require("../models/lecture/lectureDetail");
const authLecture = require("../models/authLecture.json");

const { InputValidationError } = require("../errors/generalError");
const {
  UnauthenticatedError,
  UnauthorizedError,
  DuplicatedAuthError,
  DuplicatedAccountError,
  InvalidLectureAuth,
} = require("../errors/authError");
const { NotFoundLecture } = require("../errors/notFoundError");

const currentSemester = "2022-2";

const getLogin = async (req, res, next) => {
  const isLogined = req.session.isLogined || false;
  return res.status(200).send({ isLogined });
};

const isEmpty = (field) => field === "" || field === undefined;

const postJoin = async (req, res, next) => {
  const { accountId, password, username, email } = req.body;
  const isAuth = false;
  const profileImage = process.env.DEFAULT_PROFILE_IMAGE;

  try {
    if (isEmpty(accountId)) {
      throw new InputValidationError("id를 입력하세요.", 400);
    } else if (isEmpty(password)) {
      throw new InputValidationError("비밀번호를 입력하세요.", 400);
    } else if (isEmpty(username)) {
      throw new InputValidationError("닉네임을 입력하세요.", 400);
    } else if (isEmpty(email)) {
      throw new InputValidationError("email을 입력하세요.", 400);
    }

    if (await User.exists({ accountId })) {
      throw new DuplicatedAccountError("이미 존재하는 아이디입니다.", 409);
    } else if (await User.exists({ username })) {
      throw new DuplicatedAccountError("이미 존재하는 닉네임입니다.", 409);
    } else if (await User.exists({ email })) {
      throw new DuplicatedAccountError("이미 존재하는 이메일입니다.", 409);
    }

    const user = await User.create({
      accountId,
      password,
      username,
      email,
      isAuth,
      profileImage,
    });

    const userEmailAuth = await UserEmailAuth.create({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    req.email = email;
    req.token = userEmailAuth.token;
    next();
  } catch (error) {
    next(error);
    console.error(error);
  }
};

const postLogin = async (req, res, next) => {
  const { accountId, password } = req.body;
  try {
    if (isEmpty(accountId)) {
      throw new InputValidationError("아이디를 입력해주세요.", 400);
    }
    if (isEmpty(password)) {
      throw new InputValidationError("비밀번호를 입력해주세요.", 400);
    }
    let user = await User.findOne({ accountId });
    if (user) {
      const isPasswordRight = await bcrypt.compare(password, user.password);
      if (!user || !isPasswordRight) {
        throw new UnauthenticatedError("등록되지 않은 ID 또는 PW입니다.", 402);
      } else if (!user.isAuth) {
        throw new UnauthenticatedError("이메일이 인증되지 읺았습니다.", 402);
      } else {
        user = user.toObject();
        delete user["password"];
        req.session.user = user;
        req.session.isLogined = true;
        const session = req.session;
        return res.status(200).send(session);
      }
    } else {
      throw new UnauthenticatedError("등록되지 않은 ID 또는 PW입니다.", 402);
    }
  } catch (error) {
    next(error);
  }
};

const getLogout = async (req, res, next) => {
  req.session.destroy();
  res.status(200).send("세션 삭제");
};

const getProfile = async (req, res, next) => {
  const userId = req.session.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new UnauthorizedError("등록되지 않은 사용자입니다.", 401);
    }
    const profileImage = user.profileImage
      ? user.profileImage
      : process.env.DEFAULT_PROFILE_IMAGE;
    return res.status(200).send({ profileImage });
  } catch (error) {
    next(error);
  }
};

const getMypage = async (req, res, next) => {
  const userId = req.session.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new UnauthorizedError("등록되지 않은 사용자입니다.", 401);
    }
    const userResult = {
      _id: user._id,
      accountId: user.accountId,
      username: user.username,
      email: user.email,
      isAuth: user.isAuth,
      profileImage: user.profileImage,
    };
    const userLecture = await UserLecture.findOne({ userId });
    if (!userLecture) {
      return res.status(200).send({ userResult });
    }
    const lectures = [];
    for (let lectureDetail of userLecture.lectureDetailId) {
      let lecture = await LectureDetail.findById(lectureDetail).populate(
        "lectureId"
      );
      if (!lecture) {
        throw new NotFoundLecture("해당하는 강의 정보가 없습니다.", 404);
      } else {
        lecture = lecture.toObject();
        lecture["lecture"] = lecture["lectureId"];
        delete lecture["lectureId"];
        lectures.push(lecture);
      }
    }
    return res.status(200).send({ userResult, lectures });
  } catch (error) {
    next(error);
  }
};

const editMypage = async (req, res, next) => {
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
    next(error);
  }
};

const editMypageProfile = async (req, res, next) => {
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
    next(error);
  }
};

const getAuthLecture = async (req, res, next) => {
  return res.status(200).send(authLecture);
};

const postAuthLecture = async (req, res, next) => {
  const userId = req.session.user._id;
  const authLectureData = req.body;
  if (!authLectureData) {
    throw new InvalidLectureAuth("인증할 수강정보가 없습니다.", 400);
  }
  try {
    /**
     * 1. 유저의 인증학기로 받은 데이터 필터링
     * 2. 받은 데이터의 강의+교수님이 lecutre에 있는지 확인 (원래 서비스라면, 가지고 있어야함)
     * 3. 받은 데이터의 학기+과목코드+강의시간이 lectureDetail에 있는지 확인 (원래 서비스라면, 가지고 있어야함)
     * 4. userLecture에 lectuerDetailId를 추가
     */

    const userLecture = await UserLecture.findOne({ userId }).select(
      "userAuthSemeter"
    );
    if (userLecture && userLecture.userAuthSemeter) {
      // 이미 수강인증한 학기가 있는 경우
      if (userLecture.userAuthSemeter === currentSemester) {
        throw new DuplicatedAuthError("이미 수강인증되었습니다.", 409);
      }
      authLectureData = authLectureData.filter(
        (lecture) => lecture.lectureSemester > userLecture.userAuthSemeter
      );
    }

    const lectureDetails = [];
    for (let data of authLectureData) {
      const lectureId = await Lecture.find({
        lectureName: data.lectureName,
        lectureProfessor: data.lectureProfessor,
      });
      const lectureDetail = await LectureDetail.findOne({
        lectureId,
        lectureSemester: data.lectureSemester,
        lectureCode: data.lectureCode,
        lectureTime: data.lectureTime,
      });
      if (!lectureDetail) {
        throw new NotFoundLecture("해당하는 강의 세부 정보가 없습니다.", 404);
      } else {
        lectureDetails.push(lectureDetail._id);
      }
    }

    let updateUserLecture = {};
    if (!userLecture) {
      // 수강 인증한 학기가 아예 없는 경우 userLecture document 새로 생성
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
    next(error);
  }
};

module.exports = {
  getLogin,
  postJoin,
  postLogin,
  getLogout,
  getProfile,
  getMypage,
  editMypage,
  editMypageProfile,
  getAuthLecture,
  postAuthLecture,
};
