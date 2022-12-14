const Pool = require('pg').Pool
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'xgames_db',
  password: 'admin',
  port: 5432,
})

const database = require("../config/db-config");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');



exports.register = async (req, res)=>{ 

  const { user_email , password ,user_name ,user_lastname, account } = req.body;

  const sql = 'SELECT * FROM users WHERE user_email = $1';
  db.query(sql,[user_email],(err, results)=>{
      if(results.rowCount == 0)
      {

              db.query(
                  'INSERT INTO users (user_email , password ,user_name ,user_lastname,account ) VALUES ($1,$2,$3,$4,$5) RETURNING user_id ',[user_email,password ,user_name ,user_lastname,account],
                  (db_err,results) => {
                      if(db_err)
                      {
                          res.status(400).json({message:'Query failed'});
                      }else
                      {
                          res.status(200).json({message: user_name+' has been registered, Please login'});
                      }
                        
          })
      }else
      {
          res.status(400).json({message:'User already exists, Please login!'});
      }
  });
}


exports.login =  (req, res)=>{
    
  const {user_email,password} = req.body;
  const sql = 'SELECT * FROM users WHERE user_email = $1';
  db.query(sql,[user_email],(err, results)=>{
      if(err) 
      {res.status(400).json({message: "Error communicating with database"})}
      else{
          if(results.rowCount == 0)
          {
              res.status(400).json({message: "User does not exist, Please register"})
          }else{
              //bcrypt.compare(password,results.rows[0].password,(passErr,result)=> {
                  if(password != results.rows[0].password)
                  {
                      res.status(400).json({message: "Invalid Credentials, Please try again"});

                  }else
                  {
                      const token = jwt.sign({
                              user_id: results.rows[0].user_id,
                              user_email: results.rows[0].user_email,
                              user_name: results.rows[0].user_name,
                              user_lastname: results.rows[0].user_lastname,
                              password: results.rows[0].password,
                              account: results.rows[0].account,
                             
                          },
                          process.env.SECRET_KEY,{
                              algorithm: 'HS256',
                              expiresIn: 120
                          });
                          res.status(200).json({message: "Welcome! " + results.rows[0].user_name, token:token,}); 
                 }
              //})
               
                  
              }

          

      }

  })  
}

exports.getOneUser = (req, res) => {

    const user_id = req.params.user_id;
    //console.log(user_id);

    const sql = 'SELECT * FROM users WHERE user_id = $1';
    db.query(sql,[user_id],(err, results)=>{
        if(err) {
            //console.log(err)
             res.status(400).json({message:'Query failed'}) }else{
            res.status(200).json(results.rows[0]);
        }
    })
}


exports.updateUser = async (req, res)=>{
   
    const user_id = req.params.user_id;
    const { password ,user_name ,user_lastname} = req.body;
  
    db.query(
      'UPDATE users SET password = $1 , user_name = $2, user_lastname = $3  WHERE user_id = $4',
        [password ,user_name ,user_lastname  , user_id],
       (error,results) => {
        if (error) {
            res.status(400).json({message:'Query failed'});
        }else {res.status(200).json({message:'Your profile was updated successfully'});}
    
      })
}


