const jwt = require("jsonwebtoken")

const getUserByToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRECT_KEY, (err, user) => {
            if(err) return reject(err);
            resolve(user)
        })
    })
}

const authCheck = async (req, res, next) => {
    const headers = req.headers;
    const authToken = headers.authtoken;

    if(!(authToken && authToken.startsWith("Bearer "))){
        return res.status(400).json({
            status : false,
            message : "You are unauthorized for this activity"
        })
    }

    const token = authToken.split(" ")[1]

    let user;
    try{
        user = await getUserByToken(token);
        req.body.authUser = user.user
    }
    catch(e){
        return res.status(400).send("Authorized token was not provided or not valid")
    }
    return next()
} 

module.exports = authCheck;