const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://bikashi:bikash123@cluster0.4f5lmam.mongodb.net/payment-app"
);

const userTable = new mongoose.Schema({ // user Schema
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
});

const accountSchema = new mongoose.Schema({ // Account schema
  userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'user',
      required: true
  },
  balance: {
      type: Number,
      required: true
  }
});

const user = mongoose.model("userDetail", userTable);
const Account= mongoose.model('account',accountSchema)


module.exports = {
  user,
  Account
};
