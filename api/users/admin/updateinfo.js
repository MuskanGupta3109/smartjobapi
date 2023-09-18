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
//     getallcompany:(req,res,next)=>{
//         var query="select * from company";
//         pool.query(query,(err,results)=>{
//                 if(!err){
//                         return res.status(200).json({
//                                 results,
//                                 message:"successful"
//                         });
//                 }
//                 else{
//                         return res.status(500).json(err);
//                 }
//         })
// },
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
getallapprovedjobs:(req,res,next)=>{
        // const is_Active=req.body.is_active;
        var query="select * from jobs where is_approved=1";
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
getallcompany:(req,res)=>{
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
        var query=`SELECT * FROM company ORDER BY company.company_id ASC LIMIT ${start_limit},${record_per_page}`;
        var query2=`SELECT COUNT(*) FROM jobs`;
        pool.query(query,(err,results)=>{
                if(!err){
                        
                        pool.query(query2,(err,result2)=>{
                                if(!err){
                                        return res.status(200).json({
                                                error:0,
                                                data:{...results, candidateCound:result2},
                                                message:"successful"
                                        });
                                }
                                else{
                                        return res.status(500).json(err);
                                }
                        })
                        // return res.status(200).json({
                        //         error:0,
                        //         data:results,
                        //         message:"successful"
                        // });
                }
                else{
                        return res.status(500).json(err);
                }
        //   res.render('users-form', { title: 'User List', editData: data[0]});
        });
},
getallnotapprovedjobs:(req,res,next)=>{
        // const is_Active=req.body.is_active;
        var query="select * from jobs where is_approved=0";
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
}









}