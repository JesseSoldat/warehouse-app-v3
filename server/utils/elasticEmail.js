const elasticemail = require("elasticemail");

const username = process.env.ELASTIC_MAIL_USER;
const apiKey = process.env.ELASTIC_MAIL_API;

const sendMail = async (req, user, token, type) => {
  const client = elasticemail.createClient({
    username,
    apiKey
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

  const body_text = `
    Greetings from JLab Warehouse App,

    ${content}


    ${link}




      `;

  const msg = {
    from: "jessesoldat@gmail.com",
    from_name: "JLab Warehouse App",
    to: "jessesoldat@gmail.com",
    subject,
    body_text
  };

  client.mailer.send(msg, function(err, result) {
    if (err) {
      return console.error("Err:", err);
    }

    console.log(result);
  });
};

module.exports = sendMail;
