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
      ? "Please verify your account by clicking the link:"
      : "Please reset your account's password by clicking the link:";

  const prefix = process.env.NODE_ENV === "production" ? "https://" : "http://";

  const url = type === "confirm" ? "/api/comfirmEmail/" : "/resetPassword/";

  const comfirmUrl = `${prefix}${req.headers.host}${url}${token}`;

  const resetPasswordUrl = `${prefix}${req.headers.host}${url}${token}`;

  const link = type === "confirm" ? comfirmUrl : resetPasswordUrl;

  const mailOptions = {
    from: "no-reply@warehouse-application.com",
    to: user.email,
    subject,
    text: `Hello,

    ${content}

    ${link}`
  };

  transporter.sendMail(mailOptions, err => {
    if (err) {
      console.log("Send Mail Err:", err);
    }
  });
};

module.exports = sendMail;
