require("dotenv").config();
const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb://127.0.0.1:27017/tokens", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const TdTokenSchema = new mongoose.Schema({
  access_token: {
    type: String,
    // required: true,
    default: "",
  },
  refresh_token: {
    type: String,
    // required: true,
    default: "",
  },
  access_last_update: {
    type: String,
    // required: true,
    default: "",
  },
  refresh_last_update: {
    type: String,
    // required: true,
    default: "",
  },
});

TdTokenSchema.pre("save", async function (next) {
  const token = this;

  if (token.isModified("access_token")) {
    console.log("GOTIT access_token");
    token.token = await bcrypt.hash(token.access_token, process.env.HASH_SALT);
  }

  if (token.isModified("refresh_token")) {
    console.log("GOTIT refresh_token");
    token.token = await bcrypt.hash(token.refresh_token, process.env.HASH_SALT);
  }

  next();
});

const TdTokens = mongoose.model("td-token", TdTokenSchema);

const tdtoken = new TdTokens();

tdtoken
  .save()
  .then(() => {
    console.log(tdtoken);
  })
  .catch((error) => {
    console.log(error);
  });
