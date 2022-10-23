const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://sketch:sketch123@cluster0.mr2msfg.mongodb.net/?retryWrites=true&w=majority";

const connection = () => {
    return mongoose.connect(dbUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true, //make this true
        autoIndex: true, //make this also true
    });
}

module.exports = { connection };