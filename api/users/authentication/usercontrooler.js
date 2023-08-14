const{ genSaltSync, hashSync,compareSync } = require("bcrypt");
const{register,getusers,getjobseker,getrecruiter,getadmin,getuserbyemail}=require("./userservice");
const{sign}=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const pool=require("../../../db/connect_db");

const mysql=require("mysql");

const{createPool}=require("mysql");



module.exports={
    
    getusers:(req,res)=>{
        getusers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                
                data:results
            })
        })
    },
    getjobseker:(req,res)=>{
        // const id=req.params.id;
        getjobseker((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"record not found"

                });
            }
            return res.json({
                success:1,
                message:"jobseeker found succesfuly",
                data:results

            });
        });
    },
    getrecruiter:(req,res)=>{
        // const id=req.params.id;
        getrecruiter((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"record not found"

                });
            }
            return res.json({
                success:1,
                message:"recruiter found succesfuly",
                data:results

            });
        });
    },
    getadmin:(req,res)=>{
        // const id=req.params.id;
        getadmin((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"record not found"

                });
            }
            return res.json({
                success:1,
                message:"admin found succesfuly",
                data:results

            });
        });
    },
    userlogin:(req,res)=>{
        const body=req.body;
        const email=req.body.email;
        const password=req.body.password;
        const role=req.body.role;
        const id=req.params.user_id;
        console.log(body);
        getuserbyemail(body.email,body.role,(err,results)=>{
           
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"invalid email or passwords"
                });
            }
        if(email&&password&&role){
           
                if(email&&password){
                // const emailResponse=JSON.parse(results);
                const emailResponse=(results)
                console.log("getuserbyemail",emailResponse[0].password);
                const result=compareSync(body.password,emailResponse[0].password);
                console.log(result,results)
                if(result){
                    // results.password=undefined;
                   if(email&&role=="1"){
                    const jsonwebtoken=sign({result:results},"muskan1234",{
                        expiresIn:"1h"
                    });
                    return res.json({
                        success:1,
                        message:"admin login successfully",
                        data:results,
                        id:id,
                        token:jsonwebtoken

                    });
                   }
                   if(email&&role=="2"){
                    const jsonwebtoken=sign({result:results},"muskan1234",{
                        expiresIn:"1h"
                    });
                    return res.json({
                        success:1,
                        message:"recriuter login successfully",
                        data:results,

                        id:id,
                        token:jsonwebtoken
                    });

                   }
                   if(email&&role=="3"){
                    const jsonwebtoken=sign({result:results},"muskan1234",{
                        expiresIn:"1h"
                    });
                    return res.json({
                        success:1,
                        message:"job seeker login successfully",
                        data:results,
                        id:id,
                        token:jsonwebtoken
                    });
                   }
                    
                }else{
                    // return res.json({
                    //     success:0,
                    //     message:"invalid email or password"
                    return res.status(401).json({
                        success:0,
                        message:'invalid email or password',
                    });
                }
                }
            
                
        }else{
            res.status(401).json({
                message:'all fields are required',
        })
        }
            });
       
    },
    // createUser:async (req, res) => {
    //     const name = req.body.name;
    //     const email = req.body.email;
    //     const role=req.body.role;
    //     const hashedPassword = await bcrypt.hash(req.body.password, 10);
       
    //    pool.getConnection(async (err, connection) => {
    //         if (err) throw (err)
    //         const sqlSearch = "SELECT * FROM users WHERE email=? "
    //         const search_query = mysql.format(sqlSearch, [email])
    //         const sqlInsert = "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)"

    //         const insert_query = mysql.format(sqlInsert, [name,email,hashedPassword,role])
    //         // ? will be replaced by values
    //         // ?? will be replaced by string
    //         await connection.query(search_query,async (err, result) => {
    //             if (err) throw (err)
    //             console.log("------> Search Results")
    //             console.log(result.length)
    //             if (result.length != 0) {
    //                 connection.release()
    //                 console.log("------> User already exists")
    //                 res.sendStatus(409)
    //             }
    //             else {
    //                 if(hashedPassword){
    //                     if(name&&email&&hashedPassword&&role){
                      
    //                         await connection.query(insert_query, (err, result) => {
    //                             connection.release()
    //                             if (err) throw (err)
    //                             console.log("--------> Created new User")
    //                             console.log(result.insertId)
    //                             res.sendStatus(201)
    //                         })
                          
    //                     }
    //                     else{
    //                          res.status(401).json({
    //                             message:'all fields are required',
    //                     })
    //                     }
    //                 }
    //                 else{
    //                     res.status(401).json({
    //                         message:'password are required',
    //                 })
    //                 }
    
                
    //             }
    
    //         }) //end of connection.query()
    //     }) //end of db.getConnection()
    //     },//end of app.post()



        // updateuser:(req,res)=>{
        //     const id=req.params.user_id;
        //     // let data=req.body;
        //     const{name}=req.body;


        //     const query="update users set name=? where user_id=?";
        //     pool.query(query,[name,id],(err,result)=>{
        //         if(!err){
        //             if(result.affectedRows==0){
        //                 return res.status(404).json({message:"product id does not foumd"});
        
        //             }
        //             return res.status(200).json({message:"product update successfully"});
        //         }
        //         else {
        //             return res.status(500).json(err);
        //         }
        //     })
        // },

        // createUsers:async (req, res) => {
        //     const name = req.body.name;
        //     const email = req.body.email;
        //     const role=req.body.role;
        //     const hashedPassword = await bcrypt.hash(req.body.password, 10);
           
        //    pool.getConnection(async (err, connection) => {
        //         if (err) throw (err)
        //         const sqlSearch = "SELECT * FROM users WHERE email=? "
        //         const search_query = mysql.format(sqlSearch, [email])
        //         const sqlInsert = "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)"
        //         const copyinsert="INSERT INTO candidate (name,user_id) values (?,?)"
        //         const insert_query = mysql.format(sqlInsert,[name,email,hashedPassword,role])
        //         // const val="select last_inserted_id()";
        //         // const query=pool.query(val)
                
        //         // const copy_query=mysql.format(copyinsert,[name,insertId])
                
        //         // ? will be replaced by values
        //         // ?? will be replaced by string
        //         await connection.query(search_query,async (err, result) => {
        //             if (err) throw (err)
        //             console.log("------> Search Results")
        //             console.log(result.length)
        //             if (result.length != 0) {
        //                 connection.release()
        //                 console.log("------> User already exists")
        //                 res.sendStatus(409)
        //             }
        //             else {
        //                 if(hashedPassword){
        //                     if(name&&email&&hashedPassword&&role){
                          
        //                         await connection.query(insert_query, (err, result) => {
        //                             connection.release()
        //                             if (err) throw (err)
        //                             console.log("--------> Created new User")
        //                             console.log(result.insertId)
        //                            const insertId=result.insertId
        //                            const copy_query=mysql.format(copyinsert,[name,insertId])
        //                             connection.query(copy_query,(err,result)=>{
                                        
        //                                 if(err) throw (err)
        //                                 console.log("--------> Created new User")
        //                                 console.log(result.insertId)
        //                         })
        //                             res.sendStatus(201)
        //                         })
                              
        //                     }
        //                     else{
        //                          res.status(401).json({
        //                             message:'all fields are required',
        //                     })
        //                     }
        //                 }
        //                 else{
        //                     res.status(401).json({
        //                         message:'password are required',
        //                 })
        //                 }
        
                    
        //             }
        
        //         }) //end of connection.query()
        //     }) //end of db.getConnection()
        //     },



    createUseers:async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const role=req.body.role;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
               
        pool.getConnection(async (err, connection) => {
                if (err) throw (err)
                const sqlSearch = "SELECT * FROM users WHERE email=? "
                const search_query = mysql.format(sqlSearch, [email])
                const sqlInsert = "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)"
                const copyinsert="INSERT INTO candidate (name,user_id) values (?,?)"
                const insert_query = mysql.format(sqlInsert,[name,email,hashedPassword,role])
                // const val="select last_inserted_id()";
                // const query=pool.query(val)
                
                // const copy_query=mysql.format(copyinsert,[name,insertId])
                
                // ? will be replaced by values
                // ?? will be replaced by string
                await connection.query(search_query,async (err, result) => {
                    if (err) throw (err)
                    console.log("------> Search Results")
                    console.log(result.length)
                    if (result.length != 0) {
                        connection.release()
                        console.log("------> User already exists")
                        res.sendStatus(409)
                    }
                    else {
                        if(hashedPassword){
                            if(name&&email&&hashedPassword&&role){
                        
                                await connection.query(insert_query, (err, result) => {
                                    connection.release()
                                    if (err) throw (err)
                                    console.log("--------> Created new User")
                                    console.log(result.insertId)
                                if(role==1){
                                    const insertId=result.insertId
                                const copy_query=mysql.format(copyinsert,[name,insertId])
                                    connection.query(copy_query,(err,result)=>{
                                        
                                        if(err) throw (err)
                                        console.log("--------> Created new User")
                                        console.log(result.insertId)
                                        // console.log(result.name)
                                })
                                }
                                    // res.sendStatus(201)
                                    return res.json({

                                       data:result,
                                        message:"created successfully"
                                    });

                                })
                            
                            }
                            else{
                                res.status(401).json({
                                    message:'all fields are required',
                            })
                            }
                        }
                        else{
                            res.status(401).json({
                                message:'password are required',
                        })
                        }
        
                    
                    }
        
                }) //end of connection.query()
            }) //end of db.getConnection()
            },


                createUseerbycontactno:async (req, res) => {
                    const contact_no = req.body.contact_no;
                  
                    const role=req.body.role;
                    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
                   
                   pool.getConnection(async (err, connection) => {
                        if (err) throw (err)
                        const sqlSearch = "SELECT * FROM users WHERE contact_no=? "
                        const search_query = mysql.format(sqlSearch, [contact_no])
                        const sqlInsert = "INSERT INTO users (contact_no,role) VALUES (?,?)"
                        const copyinsert="INSERT INTO candidate (contact_no,user_id) values (?,?)"
                        const insert_query = mysql.format(sqlInsert,[contact_no,role])
                       
                        const data=await connection.query(search_query,async (err, result) => {
                            if (err) throw (err)
                            console.log("------> Search Results")
                        
                            console.log(result.length)
                            if (result.length != 0) {
                                connection.release()
                                console.log("------> User already exists")
                                
                                // res.sendStatus(409)
                                return res.status(409).json(result);
                            }
                            else {
                                if(contact_no){
                                    if(contact_no&&role){
                                  
                                        await connection.query(insert_query, (err, result) => {
                                            connection.release()
                                            if (err) throw (err)
                                            console.log("--------> Created new User")
                                            console.log(result.insertId)
                                           if(role==1){
                                            const insertId=result.insertId
                                           const copy_query=mysql.format(copyinsert,[contact_no,insertId])
                                            connection.query(copy_query,(err,result)=>{
                                                
                                                if(err) throw (err)
                                                console.log("--------> Created new User")
                                                console.log(result.insertId)
                                                // return result
                                        })
                                           }
                                            // res.sendStatus(201)
                                            return res.json({
                                               
                                                message:"created succesfully",
                                                result
                                            })
                                        })
                                      
                                    }
                                    else{
                                         res.status(401).json({
                                            message:'all fields are required',
                                    })
                                    }
                                }
                                else{
                                    res.status(401).json({
                                        message:'Contact number are required',
                                })
                                }
                
                            
                            }
                
                        }) //end of connection.query()
                    }) //end of db.getConnection()
                    },


            // insert:async(req,res)=>{
            //     const id=req.params.id;
            //     const{high_school_name,high_school_board,high_school_percentage,high_school_yr_of_pass,intermediate_institution}=req.body
            //     pool.getConnection=(async (err,connection)=>{
            //         const sqlInsert = "INSERT INTO candidate(high_school_name,high_school_board,high_school_percentage,high_school_yr_of_pass,intermediate_institution) VALUES (?,?,?,?,?)"
            //         const insert_query = mysql.format(sqlInsert,[high_school_name,high_school_board,high_school_percentage,high_school_yr_of_pass,intermediate_institution,id])
            //         await connection.query(insert_query, (err, result) => {
            //             connection.release()
            //             if (err) throw (err)
            //             console.log("--------> Created new User")
            //             console.log(result.insertId)
            //             res.sendStatus(201)
            //         })
            //     }

            //     )
            // }
    

    
    
}