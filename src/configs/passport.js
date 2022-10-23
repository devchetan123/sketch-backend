const User =  require("../models/user.model")

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
       
        let user = await User.findOne({ email : profile._json.email })

        console.log(profile, "profile")
      
              if(!user){
                  user = await User.create({ email : profile._json.email, firstName : profile._json.name, userName : profile._json.email, password : "123"})

              }

      return done(null, "user");
    }
  )
);

module.exports = passport;