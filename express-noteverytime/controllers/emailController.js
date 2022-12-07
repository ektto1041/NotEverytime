/** @format */

const nodemailer = require("nodemailer");

const postEmail = (req, res) => {
  const EMAIL = process.env.EMAIL;
  const EMAIL_PW = process.env.EMAIL_PW;

  let receiverEmail = process.env.RECEIVER_EMAIL;

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
    subject: "[nodemailer] Sample Email",
    html: "<h1>Hello, World!</h1>",
  };

  // email 전송
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).json(error.message);
      return;
    }

    console.log(info);
    res.status(200).json({ message: "send mail success!" });
    transport.close();
  });
};

module.exports = {
  postEmail,
};
