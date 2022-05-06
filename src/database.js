require("dotenv").config()
const mongoose = require("mongoose");
//const URI = process.env.MONGO_ATLAS;
const URI = "mongodb+srv://Misaianes:srdinero741@cluster0.rluxc.mongodb.net/mernStackTask?retryWrites=true&w=majority";
mongoose.connect(URI)
.then(db=>{
    console.log("DB is connected")
}).catch(err=>console.error(err));

module.exports= mongoose;