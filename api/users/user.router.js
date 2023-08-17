const { getusers, getjobseker, getrecruiter, getadmin, userlogin, createUser,updateuser, createUsers, insert, createUseers, createUseerbycontactno, logout} = require("../users/authentication/usercontrooler");
const router = require("express").Router();
const {updateeducation,updateskills,updatetechnical, getalljob, getcandidatebyid,getcandidatepersonalinfo,getcandidateeduinfo, getjobbyid, edittechnical, editeducation, editeskills, editpersonalinfo,updatepersonalinfo, editresume, updateresume, appliedonjob, pagignation, editactive, updateactive, pagignationwithpage, pagignationofcandidate, search, searchforcandidate, searchforjob, uploadimage, getimage, getresume, uploadresume, applyonjob, pagignationofjobwithpage, pagignationofusers, addquery, totaljobapply}=require("../users/jobseeker/updateinfo")
const{update,getallapprovedjobs, getallcompany,getcompanybyid, getallnotapprovedjobs}=require("../users/admin/updateinfo")
const pool=require("../../db/connect_db");
const { addcompany, addjob, updatejob, getjob, getidproof, uploadidproof, getallactive, getalldeactive, editcompanydetail, updatecompanydetail, getallapprovedjobsforcompany } = require("./updateusers");
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

router.get("/getallactive",getallactive)
router.get("/getalldeactive",getalldeactive)
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
    

module.exports = router;