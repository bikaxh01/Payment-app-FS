const express = require("express");
const router = express.Router();
const zod = require("zod");
const { user, Account } = require("../Database/userDB");
const { JWT_SECRET } = require("../config");
const JWT = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

const signUpBody = zod.object({
  //input validation
  username: zod.string().email(),
  password: zod.string().min(6),
  firstname: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  const {success}  = signUpBody.safeParse(req.body); // checkinguser input is valid ?
  if (!success) {
    res.status(404).json("Invalid input"); // not valid
    return;
  }

  const existingUser = await user.findOne({
    // does user exists..?
    // checking is user exists or !
    userName: req.body.username,
  });

  if (existingUser) {
    return res.json({
      msg: "user already exist",
    });
  }

  const User = await user.create({
    // save user detail to DB
    userName: req.body.username,
    password: req.body.password,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
  });

  const userID = User._id; //  retriving ID from user

  await Account.create({
    // Adding userID and Balance in Account DB
    userId: userID,
    balance: 1 + Math.random() * 10000,
  });

  const token = JWT.sign(
    // Creating JWT
    {
      userID,
    },
    JWT_SECRET
  );

  res.json({
    // sending JWT as response
    msg: "User Created",
    token: token,
  });
});

const signIn = zod.object({
  // input validation schema
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  // loggin route

  const { success } = signIn.safeParse(req.body); // validatig userInput
console.log("hello");
  

  if (!success) {
    // !validate return
    return res.status(404).json({
      msg: "Invalid input",
    });
  }

  const userExists = await user.findOne({
    // does user already exists..?
    userName: req.body.username,
    password: req.body.password,
  });
  
  if (userExists) {
    const token = JWT.sign(
      // JWT created
      {
        userId: userExists._id
      },
      JWT_SECRET
    );
    res.json({
      // response back with JWT
      signed_In: "Sucess",
      token: token,
    });
    return;
  }

  res.status(404).json({
    // res if not exists
    signed_In: false,
    msg: "Invalid user",
  });
});

const updateUser = zod.object({ // validation schema
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {  // update route
  const { success } = updateUser.safeParse(req.body); // input validating

  if (!success) {    
    res.status(400).json({  
      msg: "Invalid input",
    });
    return;
  }

  const result = await user.updateOne( // updating user detail
    { _id: req.userId },
    {
      $set: {
        firstName: req.body.firstname,
        password: req.body.password,
        lastName: req.body.lastname,
      },
    }
  );
  
  res.json({
    msg: "Udated Successfully",
  });

});

router.get("/bulk", async (req, res) => {  //user filter
  const filter = req.query.filter || "";
  const users = await user.find({ //finding all user 
      $or: [{
          firstName: {
              "$regex": filter
          }
      }, {
          lastName: {
              "$regex": filter
          }
      }]
  })

  res.json({  //returning users 
      user: users.map(user => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id
      }))
  })
})

module.exports = router;
