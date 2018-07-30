const nodemailer = require("nodemailer");

const mailaddress = process.env.MAIL_ADDRESS;
const mailpw = process.env.MAIL_PASSWORD;

const sendMail = async (req, user, token, type) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: mailaddress,
      pass: mailpw
    }
  });

  const subject =
    type === "confirm"
      ? "Account Verification Token"
      : "Account Password Reset";

  const content =
    type === "confirm"
      ? "Please verify your account by clicking the link: \nhttp://"
      : "Please reset your account's password by clicking the link: \nhttp://";

  const url = type === "confirm" ? "/api/confirmation/" : "/api/resetPassword/";

  const mailOptions = {
    from: "no-reply@warehouse-application.com",
    to: user.email,
    subject,
    text: "Hello,\n\n" + content + req.headers.host + url + token + ".\n"
  };

  transporter.sendMail(mailOptions, err => {
    if (err) {
      throw Error(err);
    }
  });
};

module.exports = sendMail;
