const express = require("express");
const bodyParser= require("body-parser");
const route = require("./Router/router")
const mongoose = require("mongoose");

//Application level middleware require for full application//

const app = express();
app.use(bodyParser.json())
app.use("/",route);


//==================Mongoose connection ======================//

mongoose.connect("mongodb+srv://msatyam566:5RKuruCHR4gM2ZDi@cluster0.dqzcc.mongodb.net/miniproject?authSource=admin&replicaSet=atlas-1kw93i-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",{
    useNewUrlParser: true})
.then( () => console.log("MongoDB is connected"))
.catch( err => console.log("connection error"))


//=========application is connected on port 3000=======================//

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000));
});