const{ genSaltSync, hashSync,compareSync } = require("bcrypt");
const{sign}=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const pool=require("../../../db/connect_db");
const mysql=require("mysql");
const{createPool}=require("mysql");



module.exports={
    // updateabout:(req,res)=>{
    //     
    //     // let data=req.body;
    //     const{about}=req.body;
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
    // }
    getallcompany:(req,res,next)=>{
        var query="select * from company";
        pool.query(query,(err,results)=>{
                if(!err){
                        return res.status(200).json({
                                results,
                                message:"successful"
                        });
                }
                else{
                        return res.status(500).json(err);
                }
        })
},
getcompanybyid:(req,res,next)=>{
    const id=req.params.company_id;
    var query="select * from company where company_id="+id;
    pool.query(query,(err,results)=>{
            if(!err){
                    return res.status(200).json({
                        results,
                        message:"successful"
                    });
            }
            else{
                    return res.status(500).json(err);
            }
    })
},










}