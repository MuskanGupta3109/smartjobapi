

const pool=require("../../../db/connect_db");

// console.log(pool)


module.exports={
    
    getusers:callback=>{
        pool.query(
            `select name,email from users`,
            [],
            (error,results,fields)=>{
                if(error){
                   return callback(error);
                }
                return callback(null,results);
            }
        );
    },
    getjobseker:callback=>{
        pool.query(
            `select user_id,name,email from users where role=1`,
          [],
          (error,results,fields)=>{
             if(error){
                return callback(error);
             }
             return callback(null,results);
                
            }
        );  
    },
    getrecruiter:callback=>{
        pool.query(
            `select user_id,name,email from users where role=2`,
          [],
          (error,results,fields)=>{
             if(error){
                return callback(error);
             }
             return callback(null,results);
                
            }
        );  
    },
    getadmin:callback=>{
        pool.query(
            `select user_id,name,email from users where role=3`,
          [],
          (error,results,fields)=>{
             if(error){
                return callback(error);
             }
             return callback(null,results);
                
            }
        );  
    },
    getuserbyemail:(email,role,callback)=>{
        console.log(email)
        pool.query(`select * from users where email="${email}" and role="${role}"`,
        [],
            (error,results,fields)=>{
                console.log(error,results);
                    if(error){
                        
                       return callback(error);
                    }
                    // return callback(null,JSON.stringify(results));
                    return callback(null,(results));
                }
        );
    },
    // updatedetails:(data,callback)=>{
    //     pool.query(
    //         `update users set name,`
    //     )

    // }
    

}