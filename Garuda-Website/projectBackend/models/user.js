const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1"); //for version 3.3 i will look for latest version
// var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    accountstatus: {
      type: String,
      default: "deactive",
      enum: ["deactive", "active", "reset"],
    },
    userinfo: {
      type: String,
      trim: true,
    },
    encry_password: {
      type: String,
    },
    verify: {
      token: {
        type: String,
      },
      liveto: {
        type: Date,
        default: () => new Date(+new Date() + 24 * 60 * 60 * 1000),
      },
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.encry_password === this.securePassword(plainpassword);
    //we take password from  and use plainpassword and match with encry password and retrurn true or false
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
      //method given in node module
    } catch (err) {
      return "";
    }
  },
  verification: function (date) {
    if (!date) {
      return false;
    } else {
      if (date == this.verify.expiredate) {
        return true;
      } else {
        return false;
      }
    }
  },
};

module.exports = mongoose.model("User", userSchema);
