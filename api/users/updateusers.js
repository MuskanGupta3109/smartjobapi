
const pool=require("../../db/connect_db")
const mysql=require("mysql");
const{createPool}=require("mysql");







module.exports={
    // addjob:async(req,res)=> {
    //         const id=req.params.company_id;
    //         console.log(id)
    //         const{title,location,description,no_of_post,domain,required_experience,package,job_type,required_qualification,required_skills,schedule}=req.body;
    //         pool.getConnection=(async (err,connection)=>{
    //             if(err) throw (err)
    //             const sqlInsert = "INSERT INTO jobs (title,location,description,no_of_post,domain,required_experience,package,job_type,required_qualification,required_skills,schedule) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
    //             const insert="INSERT INTO jobs (company_id) values (?)"
    //             const insert_query = mysql.format(sqlInsert,[title,location,description,no_of_post,domain,required_experience,package,job_type,required_qualification,required_skills,schedule])
    //             const insert_id=mysql.format(insert,[id])
    //             await connection.query(insert_query, (err, result) => {
    //                 connection.release()
    //                 connection.query(insert_id)
    //                 if (err) throw (err)
    //                 console.log("--------> Created new User")
    //                 console.log(result.insertId)
    //                 res.sendStatus(201)
    //             })
    //         })

            
    //     },


    addjob:async (req, res) => {
        const id=req.params.company_id;
        // const{title,location,description,no_of_post,domain,required_experience,package,job_type,required_qualification,required_skills,schedule}=req.body;

        const title = req.body.title;
        const location = req.body.location;
        const description = req.body.description;
        const no_of_post = req.body.no_of_post;
        const domain = req.body.domain;
        const required_experience = req.body.required_experience;
        const package = req.body.package;
        const job_type = req.body.job_type;

        console.log(id);
        const required_qualification=req.body.required_qualification;
        const required_skills=req.body.required_skills;
        const schedule=req.body.schedule;
       
        
       
       pool.getConnection(async (err, connection) => {
            if (err) throw (err)
            
            // const search_query = mysql.format(sqlSearch, [email])
            const sqlInsert = "INSERT INTO jobs (company_id,title,location,description,no_of_post,domain,required_experience,package,job_type,required_qualification,required_skills,schedule) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
            //  const insert="INSERT INTO jobs (company_id) values (?)"
            // const copyinsert="INSERT INTO candidate (name,user_id) values (?,?)"
            const insert_query = mysql.format(sqlInsert,[id,title,location,description,no_of_post,domain,required_experience,package,job_type,required_qualification,required_skills,schedule])
            // const insert_id=mysql.format(insert,[id])
            await connection.query(insert_query, (err, result) => {
                connection.release()
                // connection.query(insert_id)
                if (err) throw (err)
                console.log("--------> Created new company")
                console.log(result.insertId)
            
                res.sendStatus(201)
            })
          
                      
                           
        }) //end of connection.query()
        //end of db.getConnection()
        },







        // adddcompany:async(req,res)=>{
        //     const id=req.params.id;
        //     const{title,location,description,no_of_post,domain,required_experience,package,job_type,required_qualification,	required_skills,schedule}=req.body
        //     pool.getConnection=(async (err,connection)=>{
        //         const sqlInsert = "INSERT INTO candidate(title,location,description,no_of_post,domain,required_experience,package,job_type,required_qualification,	required_skills,schedule) VALUES (?,?,?,?,?)"
        //         const insert_query = mysql.format(sqlInsert,[title,location,description,no_of_post,domain,required_experience,package,job_type,required_qualification,	required_skills,schedule])
        //         await connection.query(insert_query, (err, result) => {
        //             connection.release()
        //             if (err) throw (err)
        //             console.log("--------> Created new User")
        //             console.log(result.insertId)
        //             res.sendStatus(201)
        //         })
        //     }

        //     )
        // },
addcompany:async (req, res) => {
            const id=req.params.user_id;
            const name = req.body.name;
            const domain = req.body.domain;
            // const logo = req.body.logo;
            const contact_no = req.body.contact_no;
            const address = req.body.address;
            const city = req.body.city;
            const state = req.body.state;
            const zip = req.body.zip;
            console.log(id)
            // const whatsapp_profile=req.whatsapp_profile;
            // const linkedin_profile=req.body.linkedin_profile;
            // const insta_profile=req.body.insta_profile;
            // const website=req.body.website;
            const description=req.body.description;
            // const domain = req.body.domain;
            
           
           pool.getConnection(async (err, connection) => {
                if (err) throw (err)
                
                // const search_query = mysql.format(sqlSearch, [email])
                const sqlInsert = "INSERT INTO company (user_id,name,domain,contact_no,address,city,state,zip,description) VALUES (?,?,?,?,?,?,?,?,?)"
                //  const insert="INSERT INTO company (user_id) values (?)"
                // const copyinsert="INSERT INTO candidate (name,user_id) values (?,?)"
                const insert_query = mysql.format(sqlInsert,[id,name,domain,contact_no,address,city,state,zip,description])
                // const insert_id=mysql.format(insert,[id])
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    // connection.query(insert_id)
                    if (err) throw (err)
                    console.log("--------> Created new company")
                    console.log(result.insertId)
                
                    res.sendStatus(201)
                })
              
                          
                               
            }) //end of connection.query()
            //end of db.getConnection()
            },
            editcompanydetail:function(req, res, next) {
                var company_id= req.params.company_id
                var sql=`SELECT * FROM company WHERE company_id=${company_id}`;
                pool.query(sql, function (err, data) {
                  if (err) throw err;
                    res.send({data:data})
                //   res.render('users-form', { title: 'User List', editData: data[0]});
                });
            },
            updatecompanydetail:function(req, res, next) {
              var company_id= req.params.company_id
              var updatedata=req.body;
              var sql = `UPDATE company SET ? WHERE company_id=${company_id}`;
              pool.query(sql, [updatedata, company_id], function (err, data) {
              if (err) throw err;
              console.log(data.affectedRows + " record(s) updated");
              res.send({data:data})
            });
            
            },


            getjob:function(req, res, next) {
                var job_id= req.params.job_id
                var sql=`SELECT * FROM jobs WHERE job_id=${job_id}`;
                pool.query(sql, function (err, data) {
                  if (err) throw err;
                    res.send({data:data})
                //   res.render('users-form', { title: 'User List', editData: data[0]});
                });
            },
            updatejob:function(req, res, next) {
            var id= req.params.job_id;
              var updatejob=req.body;
              var sql = `UPDATE jobs SET ? WHERE job_id=${id}`;
              pool.query(sql, [updatejob, id], function (err, data) {
              if (err) throw err;
              console.log(data.affectedRows + " record(s) updated");
              res.send({data:data})
            });
            
            },
            getidproof:function(req, res, next) {
                var id= req.params.company_id
                var sql=`SELECT id_proof FROM company WHERE company_id=${id}`;
                pool.query(sql, function (err, data) {
                  if (err) throw err;
                    res.send(
                        {
                        error:0,
                        data:data,
                        message:"succesful"
                        })
                        
                //   res.render('users-form', { title: 'User List', editData: data[0]});
                });
            },
          
        
        
        
                uploadidproof:(req,res)=>{
                // image=req.body.fieldname
                var id= req.params.company_id;
        
                var updateData=req.body;
                //       var files=req.file;
                var id_proof=req.file.filename;
                //       filename=files.filename;
                console.log(req.body);
                console.log(req.file);
                var sql = `UPDATE company SET id_proof='${id_proof}' WHERE company_id=${id}`;
                console.log(id_proof)
                pool.query(sql, [updateData, id], function (err, data) {
                if (err) throw err;
                console.log(data.affectedRows + " record(s) updated");
                res.send({
                error:0,
                data:data,
                message:"successfuly updated"
                })
                });
        
        
        },
        getallactivejobseeker:(req,res,next)=>{
            var query="select * from users where is_active=1 and role=1";
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
    getalldeactivejobseeker:(req,res,next)=>{
        var query="select * from users where is_active=0 and role=1";
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
getallactiverecruiter:(req,res,next)=>{
        var query="select * from users where is_active=1 and role=2";
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
getalldeactiverecruiter:(req,res,next)=>{
    var query="select * from users where is_active=0 and role=2";
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

getallapprovedjobsforcompany:(req,res,next)=>{
        // const is_Active=req.body.is_active;
        const company_id=req.params.company_id;
        var query="select * from jobs where is_approved=1 and company_id="+company_id;
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
getallpostedjobbycompany:(req,res,next)=>{
        // const is_Active=req.body.is_active;
        const company_id=req.params.company_id;
        var query="select * from jobs company_id="+company_id;
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

}