const { getusers, getjobseker, getrecruiter, getadmin, userlogin, createUser,updateuser, createUsers, insert, createUseers, createUseerbycontactno, logout, changepassword} = require("../users/authentication/usercontrooler");
const router = require("express").Router();
const {updateeducation,updateskills,updatetechnical, getalljob, getcandidatebyid,getcandidatepersonalinfo,getcandidateeduinfo, getjobbyid, edittechnical, editeducation, editeskills, editpersonalinfo,updatepersonalinfo, editresume, updateresume, appliedonjob, pagignation, editactive, updateactive, pagignationwithpage, pagignationofcandidate, search, searchforcandidate, searchforjob, uploadimage, getimage, getresume, uploadresume, applyonjob, pagignationofjobwithpage, pagignationofusers, addquery, totaljobapply}=require("../users/jobseeker/updateinfo")
const{update,getallapprovedjobs, getallcompany,getcompanybyid, getallnotapprovedjobs}=require("../users/admin/updateinfo")
const pool=require("../../db/connect_db");
const { addcompany, addjob, updatejob, getjob, getidproof, uploadidproof, getallactive, getalldeactive, editcompanydetail, updatecompanydetail, getallapprovedjobsforcompany, getallactivejobseeker, getalldeactivejobseeker, getallactiverecruiter, getalldeactiverecruiter } = require("./updateusers");
var nodemailer = require('nodemailer');
var randtoken = require('rand-token');

const { createPoolCluster } = require("mysql");
const multer  = require('multer')
const path=require('path')
var round = require( 'math-round' );
const date = new Date();
// const upload = multer({ dest: 'uploads/' })
const storage=multer.diskStorage({
  destination:'./src/image/',
  filename:(req,file,cb)=>{
    console.log('date',date.getTime())
    return cb(null,`${file.fieldname}_${date.getMilliseconds()+ Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`)
   
  }
})

const upload=multer({
  storage:storage
})

// const multistorage=multer.diskStorage({
//   destination:'uploads/',
//   filename:(req,file,cb)=>{
//     console.log('date',date.getTime())
//     return cb(null,`${file.fieldname}_${date.getMilliseconds()+ Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`,`${file.fieldname}_${date.getMilliseconds()+ Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`)
   
//   }
// })

// const uploadmultiple=multer({
//   multistorage:multistorage
// })









//get candidate
router.get("/getalluser", getusers)
router.get("/getalljobseeker", getjobseker)
router.get("/getallrecruiter", getrecruiter)
router.get("/getalladmin", getadmin)


// authentication 
router.post("/createussers",createUseers)
router.get("/login", userlogin)
router.post("/createUseerbycontactno",createUseerbycontactno)
router.post("/updatepassword/:user_id",changepassword)
// router.post("/createUser",createUser)
// router.post("/createUsers",createUsers)

// router.post("/insert/:candidate_id",insert)

//jobseeker
// router.patch("/updateeducation/:candidate_id",updateeducation)
// router.patch("/updateskills/:candidate_id",updateskills)
// router.patch("/updatepersonalinfo/:candidate_id",updatepesonalinfo)
// router.patch("/updatetechnical/:candidate_id",updatetechnical)
router.get("/getalljob",getalljob)
router.get("/getcandidatebyid/:candidate_id",getcandidatebyid)
// router.put("/updateinfo/:user_id",updateinfo)
// router.patch("/updateuser/:user_id",updateuser)
// router.get("/updatecandipersonalinfo/:candidate_id",getcandidatepersonalinfo)
router.get("/getcandidateeduinfo/:candidate_id",getcandidateeduinfo)
router.get("/getjobbyid/:job_id",getjobbyid)
router.get("/edittechnical/:candidate_id",edittechnical)
router.post("/updatetechnical/:candidate_id",updatetechnical)
router.get("/editeducation/:candidate_id",editeducation)
router.post("/updateeducation/:candidate_id",updateeducation)
router.get("/editskills/:candidate_id",editeskills)
router.post("/updateskills/:candidate_id",updateskills)
router.get("/editpersonalinfo/:candidate_id",editpersonalinfo)
router.post("/updatepersonalinfo/:candidate_id",updatepersonalinfo)
router.get("/editresume/:candidate_id",editresume)
router.post("/updateresume/:candidate_id",updateresume)

router.post("/applyonjob/:candidate_id",applyonjob)

router.get("/pagingnation",pagignation)
router.get("/editactive/:user_id",editactive)
router.post("/updateactive/:user_id",updateactive)
router.get("/pagignationofjobwithpage",pagignationofjobwithpage)
router.get("/pagignationofcandidate",pagignationofcandidate)
router.get("/pagignationofusers",pagignationofusers)
router.get("/searchforcandidate",searchforcandidate)
router.get("/searchforjob",searchforjob)
router.post("/addquery",addquery)


//recruiter
router.post("/addcompany/:user_id",addcompany)
router.post("/addjob/:company_id",addjob)
router.get("/getalljobdata/:job_id",getjob)
router.post("/updatejob/:job_id",updatejob)
router.get("/editcompanydetail/:company_id",editcompanydetail)
router.post("/updatecompanydetail/:company_id",updatecompanydetail)


//admin
router.get("/getcompany",getallcompany)
router.get("/getcompanybyid/:company_id",getcompanybyid)


router.get('/getimage/:candidate_id',getimage)
router.post('/upload/:candidate_id',upload.single('image'),uploadimage)


router.get('/getresume/:candidate_id',getresume)
router.post('/uploadresume/:candidate_id',upload.single('resume'),uploadresume)



router.get('/getidproof/:company_id',getidproof)
router.post('/uploadidproof/:company_id',upload.single('id_proof'),uploadidproof)

// router.post("/uploadmultiples",uploadmultiple.fields([{name:"profileImage"},{name:"coverImage"}]),(req,res)=>{
//   console.log(req.body);
//   console.log(req.file);

//   return res.send(filename)
// })

router.get("/getallactivejobseeker",getallactivejobseeker)
router.get("/getalldeactivejobseeker",getalldeactivejobseeker)
router.get("/getallactiverecruiter",getallactiverecruiter)
router.get("/getalldeactiverecruiter",getalldeactiverecruiter)
router.get("/getallaprovedjobs",getallapprovedjobs)
router.get("/getallnotaprovedjobs",getallnotapprovedjobs)

router.get("/getallapprovedjobforcompany/:company_id",getallapprovedjobsforcompany)


router.get("/totaljobapply/:candidate_id",totaljobapply)




router.get('/edit/:candidate_id', function(req, res, next) {  //use for edit each fields of candidate details
    var candidateId= req.params.candidate_id;
    var sql=`SELECT * FROM candidate WHERE candidate_id=${candidateId}`;
    pool.query(sql, function (err, data) {
      if (err) throw err;
        res.send({data:data})
    //   res.render('users-form', { title: 'User List', editData: data[0]});
    });
});
 router.post('/edit/:candidate_id', function(req, res, next) {
var id= req.params.candidate_id;
  var updateData=req.body;
  var sql = `UPDATE candidate SET ? WHERE candidate_id=${id}`;
  pool.query(sql, [updateData, id], function (err, data) {
  if (err) throw err;
  console.log(data.affectedRows + " record(s) updated");
  res.send({data:data})
});

});


// router.put('/user', function (req, res) {
//     let user_id = req.body.user_id;
//     let name = req.body.name;
//     let phone=req.body.contact_no;
//     if (!user_id || !name) {
//     return res.status(400).send({ error: name, message: 'Please provide user and user_id' });
//     }
//     pool.query("UPDATE users SET name = ?,contact_no=? WHERE user_id = ?", [name,phone,user_id], function (error, results, fields) {
//     if (error) throw error;
//     return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
//     });
//     });



    // router.post("/candidate/:candidate_id",  function (req, res, next) {
    //     // console.log(req.body);
    //      //console.log(req.file)
    //      var query=""
    //      var bdy=[]
       
    //      if(req.name==undefined)
    //      { query= "update candidates set high_school_name=?,high_school_board=?,high_school_percentage=?,high_school_yr_of_pass=? where candidate_id=?"
    //     bdy=    [
    //       req.body.high_school_name,
    //       req.body.high_school_board,
    //       req.body.high_school_percentage,
    //       req.body.high_school_yr_of_pass,
        
        
         
    //    ]
    //    }
    //     else
    //     {
    //      query= "update candidates set high_school_name=?,high_school_board=?,high_school_percentage=?,high_school_yr_of_pass=? where candidate_id=?"
    //      bdy=    [
    //        req.body.high_school_name,
    //       req.body.high_school_board,
    //       req.body.high_school_percentage,
    //       req.body.high_school_yr_of_pass,
         
          
          
    //      ] 
    //    }
    //      pool.query(query,
    //    bdy,
    //        function (error, result) {
    //          if (error) {
    //            console.log(error);
    //            res.status(500).json({ RESULT: false });
    //          } else {
    //            res.status(200).json({ RESULT: true });
    //          }
    //        }
    //      );
    //    });
router.get("/logout",logout);


    router.get('/delete/:user_id', function(req, res, next) {
      var id= req.params.user_id;
        var sql = 'DELETE FROM users WHERE user_id = ?';
        pool.query(sql, [id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
      });
      // res.redirect('/users/user-list');
      res.status(200).json({ RESULT: true,message:"delete user successfully" });
      
    });
    function sendEmail(email, token) {
 
      var email = email;
      var token = token;
   
      var mail = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: '', // Your email id
              pass: '' // Your password
          }
      });
   
      var mailOptions = {
          from: 'tutsmake@gmail.com',
          to: email,
          subject: 'Reset Password Link - Tutsmake.com',
          // html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/api/users/reset-password?token=' + token + '">link</a> to reset your password</p>'
          
        
      };
   
      mail.sendMail(mailOptions, function(error, info) {
       
          if (error) {
           
              console.log(error)
          } else {
            console.log(mailOptions)
              console.log(0)
          }
      });
  }
   
  /* home page */
  // router.get('/', function(req, res, next) {
   
  //     res.render('index', {
  //         title: 'Forget Password Page'
  //     });
  // });
   
  /* send reset password link in email */
  router.post('/reset-password-email', function(req, res, next) {
   
      var email = req.body.email;
   
      //console.log(sendEmail(email, fullUrl));
   
      pool.query('SELECT * FROM users WHERE email ="' + email + '"', function(err, result) {
          if (err) throw err;
           
          var type = ''
          var msg = ''
     
          console.log(result[0]);
       
          if (result[0].email.length > 0) {
   
             var token = randtoken.generate(20);
   
             var sent = sendEmail(email, token);
   
               if (sent != '0') {
   
                  var data = {
                      token: token
                  }
   
                  pool.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function(err, result) {
                      if(err) throw err
           
                  })
   
                  type = 'success';
                  msg = 'The reset password link has been sent to your email address';
   
              } else {
                  type = 'error';
                  msg = 'Something goes to wrong. Please try again';
              }
   
          } else {
              console.log('2');
              type = 'error';
              msg = 'The Email is not registered with us';
   
          }
      
          req.flash(type, msg);
          // res.redirect('/');
      });
  })
   
  /* reset page */
  router.get('/reset-password', function(req, res, next) {
       
   
      // res.send('reset-password', {
        res.send({
          title: 'Reset Password Page',
          token: req.query.token
      });
  });
   
  /* update password to database */
  router.post('/update-password', function(req, res, next) {
   
      var token = req.body.token;
      var password = req.body.password;
   
     pool.query('SELECT * FROM users WHERE token ="' + token + '"', function(err, result) {
          if (err) throw err;
   
          var type
          var msg
   
          if (result.length > 0) {
                  
                var saltRounds = 10;
   
               // var hash = bcrypt.hash(password, saltRounds);
   
              bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
   
                     var data = {
                          password: hash
                      }
   
                      .query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function(err, result) {
                          if(err) throw err
                     
                      });
   
                    });
                });
   
              type = 'success';
              msg = 'Your password has been updated successfully';
                
          } else {
   
              console.log('2');
              type = 'success';
              msg = 'Invalid link; please try again';
   
              }
   
          req.flash(type, msg);
          res.redirect('/');
      });
  })
    

module.exports = router;