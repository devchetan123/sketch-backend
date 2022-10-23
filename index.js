require("dotenv").config();
const express = require("express");
const { connection } = require("./src/configs/db");
const app = express();
const PORT = process.env.PORT
const cors = require('cors')
var session = require('express-session')


const authController = require("./src/controllers/auth.controller");
const userController = require("./src/controllers/user.controller");

// app.use(express.urlencoded({ extended: true}));
// app.use(
//   session({
//     secret: "this_is_a_secret",
//     // store: pgSessionStorage,
//     resave: true,
//     saveUnitialized: true,
//     rolling: true, // forces resetting of max age
//     cookie: {
//       maxAge: 360000,
//       secure: false // this should be true only when you don't want to show it for security reason
//     }
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());


app.use(express.json());
app.use(cors())
app.use("/auth", authController);
app.use("/users", userController);

app.listen(PORT, async () => {
    try{
        await connection();
        console.log(`server running on ${PORT}`)
    }
    catch(err) {
        console.log(err.message);
    }
    
})
