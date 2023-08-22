require("dotenv").config();
const express = require("express");
const bodyparser=require("body-parser");
const app = express();
const port = 3000;
const mysql=require("mysql")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const path=require('path')
const cors = require('cors')
var flash = require('connect-flash');
var session = require('express-session');

const storage=multer.diskStorage({
  destination:'./src/image/',
  filename:(req,file,cb)=>{
    return cb(null,`${file.filename}_${date.now()}${path.extname(file.originalname)}`)
  }
})






require("./db/connect_db");
const options={
  origin:'*'
}



app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));




app.use(cors(options))
app.use(flash());
app.use(express.json())
const userRouter=require("./api/users/user.router");




app.use("/api/users",userRouter);









app.use(express.json());
app.use(bodyparser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


  app.listen(process.env.APP_PORT,()=>{
    console.log("server up and ruuning",process.env.APP_PORT);

  
  })