const{ genSaltSync, hashSync,compareSync } = require("bcrypt");

const{sign}=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const pool=require("../../../db/connect_db");

const mysql=require("mysql");

const{createPool}=require("mysql");
const { getjob } = require("../updateusers");
const { getcompanybyid } = require("../admin/updateinfo");
const { query } = require("express");


module.exports={
//     updateeducation:(req,res)=>{
      
//             const id=req.params.candidate_id;
//             const{high_school_name,high_school_board,high_school_percentage,high_school_yr_of_pass,intermediate_institution,intermediate_board,intermediate_yr_of_pass,intermediate_percentage,ug_clg_name,ug_course,ug_percentage,ug_yr_of_pass,pg_clg_name,pg_course,pg_percentage,pg_yr_of_pass,diploma_clg_name,diploma_course,diploma_percentage,diploma_yr_of_pass}=req.body;
            
            
//             const sql="update candidate set high_school_name=?,high_school_board=?,high_school_percentage=?,high_school_yr_of_pass=?,intermediate_institution=?,intermediate_board=?,intermediate_yr_of_pass=?,intermediate_percentage=?,ug_clg_name=?,	ug_course=?,ug_percentage=?,ug_yr_of_pass=?,pg_clg_name=?,pg_course=?,pg_percentage=?,pg_yr_of_pass=?,diploma_clg_name=?,diploma_course=?,diploma_percentage=?,diploma_yr_of_pass=? where candidate_id=?";
//             const rows=pool.query(sql,[high_school_name,high_school_board,high_school_percentage,high_school_yr_of_pass,intermediate_institution,intermediate_board,intermediate_yr_of_pass,intermediate_percentage,ug_clg_name,ug_course,ug_percentage,ug_yr_of_pass,pg_clg_name,pg_course,pg_percentage,pg_yr_of_pass,diploma_clg_name,diploma_course,diploma_percentage,diploma_yr_of_pass,id]);
//             if(rows){
//                     // console.log(rows)
//                     return res.status(200).json({message:"product update successfully"});
//             }
            
        
//     },

editeducation:(req, res)=> {
        var candidateId= req.params.candidate_id;
        var sql=`SELECT high_school_name,high_school_board,high_school_percentage,high_school_yr_of_pass,intermediate_institution,intermediate_board,intermediate_yr_of_pass,intermediate_percentage,ug_clg_name,ug_course,ug_percentage,ug_yr_of_pass,pg_clg_name,pg_course,pg_percentage,pg_yr_of_pass,diploma_clg_name,diploma_course,diploma_percentage,diploma_yr_of_pass FROM candidate WHERE candidate_id=${candidateId}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({
                error:0,
                data:data,
                message:"succesful"
        })
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
    },
updateeducation:(req, res)=> {
    var id= req.params.candidate_id;
      var updateData=req.body;
      var sql = `UPDATE candidate SET ?  WHERE candidate_id=${id}`;
      pool.query(sql, [updateData, id], function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
      res.send({
        error:0,
        data:updateData,
        message:"succesful updated"
})
    });
    
    },

editeskills:(req, res)=> {
        var candidateId= req.params.candidate_id;
        var sql=`SELECT skills FROM candidate WHERE candidate_id=${candidateId}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({
                error:0,
                data:data,
                message:"successful"
        })
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
    },
updateskills:(req, res)=> {
    var id= req.params.candidate_id;
      var updateData=req.body;
      var sql = `UPDATE candidate SET ?  WHERE candidate_id=${id}`;
      pool.query(sql, [updateData, id], function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
      res.send({
        error:0,
        data:updateData,
        message:"succesful updated"
})
    });
    
    },

editpersonalinfo:(req, res)=> {
        var candidateId= req.params.candidate_id;
        var sql=`SELECT father_name,contact_no,dob,gender,martial_status,address,address2,city,state,zip FROM candidate WHERE candidate_id=${candidateId}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({
                error:0,
                data:data,
                message:"successful"
        })
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
    },
updatepersonalinfo:(req, res)=> {
    var id= req.params.candidate_id;
      var updateData=req.body;
      var sql = `UPDATE candidate SET ?  WHERE candidate_id=${id}`;
      pool.query(sql, [updateData, id], function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
      res.send({
        error:0,
        data:updateData,
        message:"succesful updated"
})
    });
    
    },

//     updatepersonalinfo:(req, res)=> {
//         var id= req.params.candidate_id;
//           var updateData=req.body;
//           const user_id=req.body.user_id;
//           const sqlSearch = "SELECT * FROM users WHERE contact_no=? "
//           const search_query = mysql.format(sqlSearch, [contact_no])
//           var sql = `UPDATE candidate SET ?  WHERE candidate_id=${id}`;
//           var sql2 = `UPDATE user SET contact_no='${contat}' WHERE user_id=${user_id}`;
//           pool.query(sql, [updateData, id], function (err, data) {
//           if (err) throw err;
//           console.log(data.affectedRows + " record(s) updated");
//           res.send({
//             error:0,
//             data:updateData,
//             message:"succesful updated"
//     })
//         });
        
//         },


//     updateskills:(req,res)=>{
      
//         const id=req.params.candidate_id;
//         const{skills}=req.body;
//         const sql="update candidate set skills=? where candidate_id=?";
//         const rows=pool.query(sql,[skills,id]);
//         if(rows){
//                 // console.log(rows)
//                 return res.status(200).json({message:"product update successfully"});
//         }
//         else {
//                 return res.status(500).json(err);
//             }
        
    
// },

// updatepesonalinfo:(req,res)=>{
//         const id=req.params.candidate_id;
//         const{father_name,contact_no,dob,gender,martial_status,address,address2,city,state,zip}=req.body;
//         const sql="update candidate set father_name=?,contact_no=?,dob=?,gender=?,martial_status=?,address=?,address2=?,city=?,state=?,zip=? where candidate_id=?";
//         const rows=pool.query(sql,[father_name,contact_no,dob,gender,martial_status,address,address2,city,state,zip,id]);
//         if(rows){
//                 // console.log(rows)
//                 return res.status(200).json({message:"product update successfully"});
              
//         }
//         else {
//                 return res.status(500).json(err);
//             }
        
// },





// updatetechnical:(req,res)=>{
//         const id=req.params.candidate_id;
//         const{current_company,current_salary,experiance,designation,domain}=req.body;
//         const sql="update candidate set current_company=?,current_salary=?,experiance,designation=?,domain=? where candidate_id=?";
//         const rows=pool.query(sql,[current_company,current_salary,experiance,designation,domain,id]);
//         if(rows){
//                 // console.log(rows)
//                 return res.status(200).json({message:"product update successfully"});
//         }
//         else {
//                 return res.status(500).json(err);
//             }
        
// },

// getalljob:(req,res)=>{
       
//         const rows= pool.query("select * from jobs"),function(error,results,fields)
//         if(rows){
//                 return rows
//                 return res.send({ error: false, data: rows, message: 'user has been updated successfully.' });
//                 return res.json.rows
//                 console.log(rows)
//                 return res.status(200).json({message:"product update successfully"});
//                    return res.send({ error: false, data:rows, message: 'user has been updated successfully.' });
//                 return res.status(200)(rows)
//         }
       
      
// },

getalljob:(req,res,next)=>{
        var query="select * from jobs";
        pool.query(query,(err,results)=>{
                if(!err){
                        return res.status(200).json({
                                error:0,
                                data:results,
                                message:"successful"
                        });
                }
                else{
                        return res.status(500).json(err);
                }
        })
},
getcandidatebyid:(req,res,next)=>{
        const id=req.params.candidate_id;
        var query="select * from candidate where candidate_id="+id;
        pool.query(query,(err,results)=>{
                if(!err){
                        return res.status(200).json({
                                error:0,
                                data:results,
                                message:"successful"
                        });
                }
                else{
                        return res.status(500).json(err);
                }
        })
},

getcandidatepersonalinfo:(req,res,next)=>{
        const id=req.params.candidate_id;
        var query="select father_name,contact_no,dob,gender,martial_status,address,address2,city,state,zip from candidate where candidate_id="+id;
        pool.query(query,(err,results)=>{
                if(!err){
                        return res.status(200).json({
                                error:0,
                                data:results,
                                message:"successful"
                        });
                }
                else{
                        return res.status(500).json(err);
                }
        })
},

getcandidateeduinfo:(req,res,next)=>{
        const id=req.params.candidate_id;
        var query="select high_school_name,high_school_board,high_school_percentage,high_school_yr_of_pass,intermediate_institution,intermediate_board,intermediate_yr_of_pass,intermediate_percentage,ug_clg_name,ug_course,ug_percentage,ug_yr_of_pass,pg_clg_name,pg_course,pg_percentage,pg_yr_of_pass,diploma_clg_name,diploma_course,diploma_percentage,diploma_yr_of_pass from candidate where candidate_id="+id;
        pool.query(query,(err,results)=>{
                if(!err){
                        return res.status(200).json({
                                error:0,
                                data:results,
                                message:"successful"
                        });
                }
                else{
                        return res.status(500).json(err);
                }
        })
},
getjobbyid:(req,res,next)=>{
        const id=req.params.job_id;
        var query="select * from jobs where job_id="+id;
        pool.query(query,(err,results)=>{
                if(!err){
                        return res.status(200).json({
                                error:0,
                                data:results,
                                message:"successful"
                        });
                }
                else{
                        return res.status(500).json(err);
                }
        })
},


addquery:async (req, res) => {
        // const id=req.params.user_id;
        const name = req.body.name;
        
      
        const contact_no = req.body.contact_no;
        const email = req.body.email;
        const subject = req.body.subject;
        const message= req.body.message;
        
        // console.log(id)
       
      
        
       
       pool.getConnection(async (err, connection) => {
            if (err) throw (err)
            
            // const search_query = mysql.format(sqlSearch, [email])
            const sqlInsert = "INSERT INTO query (name,contact_no,email,subject,message) VALUES (?,?,?,?,?)"
           
            const insert_query = mysql.format(sqlInsert,[name,contact_no,email,subject,message])
          
            await connection.query(insert_query, (err, result) => {
                connection.release()
                // connection.query(insert_id)
                if (err) throw (err)
                console.log("--------> Query add succesfully")
                console.log(result.insertId)
            
                // res.sendStatus(201)
                res.status(201).json({
                        message:'Query add succesfully',
                })
            })
          
                      
                           
        }) //end of connection.query()
        //end of db.getConnection()
        },




// updatetechnical:(req,res)=>{
//         const id=req.params.candidate_id;
//                         // const query="select * from candidate"
//                         // const run=pool.query(query);
//                         // const query=pool.query(`select * from candidate where candidate_id=${id}`)
//         var query="select * from candidate where candidate_id="+id;
//         var response=pool.query(query,(err,results)=>{
//                 if(!err){
//                         console.log(results)
//                         return JSON.stringify(results);
//                 }
//                 else{
//                         return (err);
//                 }
//         })

//         console.log(response,"querydata")
//                         // var company=current_company?current_company:query.current_company;
//                         // console.log(query.current_company,"curent company")
//                         // var salary=query.current_salary;
//         let experience=query.experiance;
//         let designations=query.designation;
//         let domains=query.domain;
        

//         const{
//                 current_company
//                 ,current_salary,experiance,designation,domain}=req.body;
//         const sql="update candidate set current_company=?,current_salary=?,experiance=?,designation=?,domain=? where candidate_id=?";
//         const rows=pool.query(sql,[current_company,current_salary,experiance,designation,domain,id]);
//         if(rows){
//                 // console.log(rows)
//                 return res.status(200).json({message:"product update successfully"});
//         }
//         else {
//                 return res.status(500).json(err);
//             }
        
// },

edittechnical:(req, res)=> {
        var candidateId= req.params.candidate_id;
        var sql=`SELECT  current_company,current_salary,experiance,designation,domain FROM candidate WHERE candidate_id=${candidateId}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({
                error:0,
                data:data,
                message:"successful"
        })
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
    },
updatetechnical:(req, res)=> {
    var id= req.params.candidate_id;
      var updateData=req.body;
      var sql = `UPDATE candidate SET ?  WHERE candidate_id=${id}`;
      pool.query(sql, [updateData, id], function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
      res.send({
        // data:data,
        error:0,
        data:updateData,
        message:"successfuly updated"
        })
    });
    
    },
    editresume:(req, res)=> {
        var candidateId= req.params.candidate_id;
        var sql=`SELECT * FROM candidate WHERE candidate_id=${candidateId}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({
                error:0,
                data:data,
                message:"successful"
                
        })
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
    },
    updateresume:(req, res)=> {
    var id= req.params.candidate_id;
      var updateData=req.body;
      var sql = `UPDATE candidate SET ?  WHERE candidate_id=${id}`;
      pool.query(sql, [updateData, id], function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
      res.send({
        error:0,
        data:updateData,
        message:"successfully updated"
        })
    });
    
    },
//     appliedonjob:(req,res)=>{
//         const candidate_id=req.params.candidate_id
//         const getjobbyid=req.body.getjobbyid

//         const sql=`select * from jobs where job_id=?`;
//         const job_detail=getjobbyid((err,result)=>{
//                 console.log(job_detail)
//                 return result
        
//         })
//         const id=result.candidate_id
//         const companydetail=getcompanybyid((err,result)=>{
//                 console.log(companydetail)
//                 return result
//         })
//         pool.query(query,(err,result)=>{

//         })
        
        

        
//     },

applyonjob:(req,res)=>{
      const  candidate_id=req.params.candidate_id;
      console.log(candidate_id)
      
//       const data=getjobbyid(err,result)
//       const job_id=data.company_id
//       const company_id=req.params.company_id
        const job_id=req.body.job_id;
        const company_id=req.body.company_id
      pool.getConnection(async(err,connection)=>{
        const sql1=`select * from jobs where job_id=${job_id}`;
        const sql=`insert into junction_tbl (job_id,candidate_id,company_id) values (?,?,?)`;
        // const insert=mysql.format(sql1)
      await connection.query(sql1,(err,result)=>{
        connection.release()
        // const candidate_id=data.candidate_id
       
        console.log(result)
        // const id=result.company_id
       
        const insert_query=mysql.format(sql,[job_id,candidate_id,company_id])
         connection.query(insert_query,(err,result)=>{
         
          // connection.query(insert_id)
          if (err) throw (err)
          console.log("--------> Applied job successfully")
          console.log(result.insertId)
      
        //   res.sendStatus(201)
         return res.send({
                data:result,
                success:1,
                message:"Applied successfully"

        })
        })
      })
       
       
      })
},

pagignation:(req,res)=>{
        // var candidateId= req.params.candidate_id;


        var sql=`SELECT * FROM junction_tbl ORDER BY junction_tbl.junction_id DESC LIMIT 10`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({
                data:data,
                message:"successful"
        })
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
},
editactive:(req, res)=> {
        var user_id= req.params.user_id;
        var sql=`SELECT is_Active FROM users WHERE user_id=${user_id}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({
                data:data,
                message:"successful"
                
        })
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
    },
    updateactive:(req, res)=> {
        var id= req.params.user_id;
      var updateData=req.body;
      var sql = `UPDATE users SET ?  WHERE user_id=${id}`;
      pool.query(sql, [updateData,id], function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
      res.send({
        data:data,
        message:"successfully updated"
        })
    });
    
    },
    pagignationofjobwithpage:(req,res)=>{
        // var candidateId= req.params.candidate_id;
        var job_id=req.params.job_id
        let page=req.body.page;
        var start_limit=1;
       
        let record_per_page=10;
        if(!page){
                page=1
                // start_limit=start_limit;
                record_per_page=record_per_page;
        }
        if(page){
                start_limit=(page-1)*record_per_page;
        }
        var sql=`SELECT * FROM jobs ORDER BY jobs.job_id ASC LIMIT ${start_limit},${record_per_page}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({
                data:data,
                message:"successful"
        })
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
},

pagignationofcandidate:(req,res)=>{
        // var candidateId= req.params.candidate_id;
        var job_id=req.params.job_id
        let page=req.body.page;
        var start_limit=1;
       
        let record_per_page=10;
        if(!page){
                page=1
                // start_limit=start_limit;
                record_per_page=record_per_page;
        }
        if(page){
                start_limit=(page-1)*record_per_page;
        }
        var sql=`SELECT * FROM candidate ORDER BY candidate.candidate_id ASC LIMIT ${start_limit},${record_per_page}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({
                data:data,
                message:"successful"
        })
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
},
pagignationofusers:(req,res)=>{
        // var candidateId= req.params.candidate_id;
        var job_id=req.params.job_id
        let page=req.body.page;
        var start_limit=1;
       
        let record_per_page=10;
        if(!page){
                page=1
                // start_limit=start_limit;
                record_per_page=record_per_page;
        }
        if(page){
                start_limit=(page-1)*record_per_page;
        }
        var sql=`SELECT * FROM users ORDER BY users.user_id ASC LIMIT ${start_limit},${record_per_page}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({
                data:data,
                message:"successful"
        })
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
},
searchforcandidate:(req,res,next)=>{
       
                const filters = req.query;
                let name=''
                let city=''
                let state=''
                let skills='' 
                let experiance=''
                if(req.query?.name)
                        name=req.query?.name
                if(req.query?.city)
                        city=req.query?.city
                if(req.query?.skills)
                        skills=req.query?.skills
                if(req.query?.experiance)
                        experiance=req.query.experiance
                if(req.query?.state)
                        state=req.query.state


               
                var sql=`select * from candidate where name like '%${name}%' and city like '%${city}%' and state like '%${state}%' and skills like '%${skills}%' and experiance like '%${experiance}%'`;
                console.log('query',req?.query)
                const {data}=pool.query(sql,function(err,result){
                        // console.log(result)
                        if (err) throw err;
            res.send({
                data:result
            })
               
              
                 })
              },
              searchforjob:(req,res,next)=>{
       
                const filters = req.query;
                let title=''
                let domain=''
                let location=''
                let required_skills='' 
                let required_experience=''
                let job_type=''
                let package=''
                if(req.query?.title)
                        title=req.query?.title
                if(req.query?.domain)
                        domain=req.query?.domain
                if(req.query?.location)
                        location=req.query?.location
                if(req.query?.required_skills)
                        required_skills=req.query.required_skills
                if(req.query?.required_experience)
                        required_experience=req.query.required_experience
                if(req.query?.job_type)
                        job_type=req.query.job_type
                if(req.query?.package)
                        package=req.query.package
               
                var sql=`select * from jobs where title like '%${title}%' and domain like '%${domain}%' and location like '%${location}%' and required_skills like '%${required_skills}%' and required_experience like '%${required_experience}%' and job_type like '%${job_type}%'  and package like '%${package}%'`;
                console.log('query',req?.query)
                const {data}=pool.query(sql,function(err,result){
                        // console.log(result)
                        if (err) throw err;
            res.send({
                data:result
            })
               
              
                 })
              },
              getimage:function(req, res, next) {
                var id= req.params.candidate_id
                var sql=`SELECT image FROM candidate WHERE candidate_id=${id}`;
                pool.query(sql, function (err, data) {
                  if (err) throw err;
                    res.send({data:data})
                //   res.render('users-form', { title: 'User List', editData: data[0]});
                });
            },
          



        uploadimage:(req,res)=>{
        // image=req.body.fieldname
var id= req.params.candidate_id;

      var updateData=req.body;
//       var files=req.file;
      var image=req.file.filename;
//       filename=files.filename;
      console.log(req.body);
        console.log(req.file);
      var sql = `UPDATE candidate SET image='${image}' WHERE candidate_id=${id}`;
      console.log(image)
      pool.query(sql, [updateData, id], function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
      res.send({
        data:data,
        message:"successfuly updated"
        })
    });
        
       
      },
      getresume:function(req, res, next) {
        var id= req.params.candidate_id
        var sql=`SELECT resume FROM candidate WHERE candidate_id=${id}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({data:data})
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
    },
  



        uploadresume:(req,res)=>{
        // image=req.body.fieldname
        var id= req.params.candidate_id;

        var updateData=req.body;
        //       var files=req.file;
        var resume=req.file.filename;
        //       filename=files.filename;
        console.log(req.body);
        console.log(req.file);
        var sql = `UPDATE candidate SET resume='${resume}' WHERE candidate_id=${id}`;
        console.log(resume)
        pool.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
        res.send({
        data:data,
        message:"successfuly updated"
        })
        });


},
totaljobapply:(req,res,next)=>{
        var id= req.params.candidate_id;
        var query=`select * from junction_tbl where candidate_id=${id}`;
        pool.query(query,(err,results)=>{
                if(!err){
                        return res.status(200).json({
                                error:0,
                                data:results,
                                message:"successful"
                        });
                }
                else{
                        return res.status(500).json(err);
                }
        })
},

addbanner:(req,res)=>{
        // image=req.body.fieldname
// var id= req.params.candidate_id;

      var updateData=req.body;
//       var files=req.file;
      var banner=req.file.filename;
//       filename=files.filename;
      console.log(req.body);
        console.log(req.file);
      var sql = `insert into bannertbl (banner) values (?)`;
//       console.log(image)
      pool.query(sql, [banner], function (err, data) {
      if (err) throw err;
      console.log(data.affectedRows + " record(s) updated");
      res.send({
        data:data,
        message:"successfuly updated"
        })
    });
        

},
getbannerbyid:function(req, res, next) {
        var id= req.params.ban_id
        var sql=`SELECT banner FROM bannertbl WHERE ban_id=${id}`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({data:data})
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
    },
    getbanner:function(req, res, next) {
        // var id= req.params.ban_id
        var sql=`SELECT banner FROM bannertbl`;
        pool.query(sql, function (err, data) {
          if (err) throw err;
            res.send({data:data})
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
    },
    uploadbanner:(req,res)=>{
        // image=req.body.fieldname
        var id= req.params.ban_id;

        var updateData=req.body;
        //       var files=req.file;
        var banner=req.file.filename;
        //       filename=files.filename;
        console.log(req.body);
        console.log(req.file);
        var sql = `UPDATE bannertbl SET banner='${banner}' WHERE ban_id=${id}`;
        console.log(banner)
        pool.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
        res.send({
        data:data,
        message:"successfuly updated"
        })
        });


},

}


