/** @format */

const nodemailer = require("nodemailer");
const User = require("../models/user/user");
const UserEmailAuth = require("../models/user/userEmailAuth");

const postEmail = (req, res) => {
  const EMAIL = process.env.EMAIL;
  const EMAIL_PW = process.env.EMAIL_PW;
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PW,
    },
  });

  // 전송할 email 내용 작성
  let mailOptions = {
    from: EMAIL,
    to: receiverEmail,
    subject: "[noteverytime] 이메일 인증 확인 메일입니다.",
    html:
      "<p>이메일 인증을 위해서는 아래 링크를 클릭하여 주세요.</p>" +
      `http://localhost:4000/authenticate/email?email=${req.email}&token=${req.token}`,
  };

  // email 전송
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).json(error.message);
    }
    console.log(info);
    transport.close();
    return res.status(200).json({ message: "send mail success!" });
  });
};

const confirmEmail = async (req, res, next) => {
  let token = await UserEmailAuth.findOne({ token: req.query.token });
  if (!token) {
    req.message =
      "expire token 토큰 정보가 만료되었습니다. 이메일 인증 요청을 다시 보내주세요.";
    next();
  } else {
    User.findOne(
      { _id: token.userId, email: req.query.email },
      (error, user) => {
        if (!user) {
          req.message = "cannot find user info 유저 정보를 찾을 수 없습니다.";
          next(message, res);
        } else if (user.isAuth) {
          req.message = "already auth user 이미 인증된 유저입니다.";
          console.log(req.message);
          next();
        } else {
          user.isAuth = true;
          user.save((error) => {
            error
              ? (req.message = error.message)
              : (req.message = "success 이메일 인증에 성공했습니다.");
            next();
          });
        }
      }
    );
  }
};

const sendResultMessage = (req, res) => {
  let script =
    "<script>alert('" +
    req.message +
    '\'); window.location.href="https://www.naver.com";</script>';
  res.write(script);
};

module.exports = {
  postEmail,
  confirmEmail,
  sendResultMessage,
};
