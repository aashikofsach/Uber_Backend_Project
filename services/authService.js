const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
  let token ,user;
  try {
    console.log("log in authService", userData);
     user = new User(userData);
    console.log(user);
    const savedData = await user.save();

    console.log("reached at 9", savedData);
    console.log("reached at 12", process.env.JWT_SECRET);

     token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.log("error in line 13 as", error);
  }

  console.log(token, "here is the log on 19");
  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid Email or password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user, token };
};

module.exports = { register, login };
