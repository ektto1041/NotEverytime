/** @format */

const nodemailer = require("nodemailer");
const User = require("../models/user/user");
const UserEmailAuth = require("../models/user/userEmailAuth");
const ejs = require("ejs");

const postEmail = (req, res) => {
  const EMAIL = process.env.EMAIL;
  const EMAIL_PW = process.env.EMAIL_PW;
  const AUTH_DOMAIN = process.env.AUTH_DOMAIN;

  let emailTemplete;
  ejs.renderFile(
    "views/authMail.ejs",
    {
      url: `${AUTH_DOMAIN}/authenticate/email`,
      email: `${req.email}`,
      token: `${req.token}`,
    },
    function (err, data) {
      if (err) {
        console.log(err);
        console.log("ejs.renderFile err");
      }
      emailTemplete = data;
    }
  );

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PW,
    },
  });

  // 전송할 email 내용 작성
  const mailOptions = {
    from: EMAIL,
    to: req.email,
    subject: "[noteverytime] 이메일 인증 확인 메일입니다.",
    html: emailTemplete,
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
  const token = await UserEmailAuth.findOne({ token: req.query.token });
  if (!token) {
    req.message = "expired token";
    next();
  } else {
    User.findOne(
      { _id: token.userId, email: req.query.email },
      (error, user) => {
        if (!user) {
          req.message = "사용자 정보를 찾을 수 없습니다.";
          next(message, res);
        } else if (user.isAuth) {
          req.message = "이미 인증된 사용자입니다.";
          console.log(req.message);
          next();
        } else {
          user.isAuth = true;
          user.save((error) => {
            error
              ? (req.message = error.message)
              : (req.message = "이메일 인증에 성공하였습니다.");
            next();
          });

        }
      }
    );
  }
};

const sendResultMessage = (req, res, next) => {
  try {
    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
    const script =
      "<script>alert('" +
      req.message +
      '\'); window.location.href="https://not-everytime.netlify.app";</script>';
    res.write(script);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postEmail,
  confirmEmail,
  sendResultMessage,
};
