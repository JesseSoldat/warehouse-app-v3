const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// models
const AuthToken = require("./tokens/authToken");
// utils
const { serverRes, msgObj } = "../utils/serverRes";
const { milliFromNow, daysFromNow } = require("../utils/timeHelpers");
// token times
const tokenExpirationTime = 30 * 1000; // 30 seconds TESTING
const tokenExpirationDays = 7; // 7 days; USE this for real token
const verificationExpirationTime = 43200; // 12 hours

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email"
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: { type: String, default: "user" },
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  const {
    username,
    email,
    _id,
    tokens,
    verificationToken,
    isVerified,
    role
  } = userObj;
  return { username, email, _id, tokens, verificationToken, isVerified, role };
};

UserSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByCredentials = async function(email, password) {
  const User = this;
  try {
    const user = await User.findOne({ email });

    if (!user) return null;

    // Make sure the user has been verified
    if (!user.isVerified) {
      const msg = msgObj("Make sure you verify this account first.", "blue");
      return serverRes(res, 400, msg, null);
    }

    const match = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, matched) => {
        matched ? resolve(user) : resolve(null);
      });
    });

    return match;
  } catch (err) {
    return null;
  }
};

UserSchema.methods.generateAuthToken = async function() {
  const user = this;

  const { _id } = user;

  // - Token expiration time by milliseconds OR days -
  //const expires = milliFromNow(tokenExpirationTime); // TESTING TOKEN
  const expires = daysFromNow(new Date(), tokenExpirationDays);

  // generate a new token
  const token = jwt
    .sign(
      {
        _id: _id.toHexString(),
        expires
      },
      process.env.TOKEN_SECRET
    )
    .toString();

  try {
    // check if the user already has a tokens array
    const authToken = await AuthToken.findOne({ user: _id });

    if (!authToken) {
      // create a new AuthToken document with the signed token
      const newToken = new AuthToken({ tokens: [token], user: _id });
      await newToken.save();
    } else {
      // pushed the signed token to the found tokens document
      authToken.tokens.push(token);
      // remove the first token if there are already move than 5 tokens
      if (authToken.tokens.length > 5) {
        authToken.tokens.shift();
      }
      await authToken.save();
    }

    return { token, expires };
  } catch (err) {
    console.log("ERR: generateAuthToken", err);
    return err;
  }
};

UserSchema.statics.findByToken = async function(token) {
  const User = this;

  try {
    // see if the token is in the database
    const authToken = await AuthToken.findOne({ tokens: token });

    if (authToken && authToken.tokens.indexOf(token) !== -1) {
      return User.findOne({
        _id: authToken.user
      });
    } else {
      return null;
    }
  } catch (err) {
    console.log("Err: User.findByToken", err);
    return null;
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
