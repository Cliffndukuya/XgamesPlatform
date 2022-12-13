
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',  //Database username
    host: 'localhost',  //Database host
    database: 'xgames_db', //Database database
    password: 'admin', //Database password
    port: 5432//Database port
  });


exports.addPost = async (req, res)=>{

    const {title,  desc, image,price  } = req.body;


    //console.log(req.body)
    
    const sql = 'INSERT INTO posts ( post_title, post_desc, post_image,post_price, hidden) VALUES ($1,$2,$3,$4,$5) RETURNING post_id';
 
    db.query(sql,[title , desc ,image,price, false],(err,results)=>{
        if(err)
        {
            console.log(err);
           res.status(400).json({message:'Query failed'});
        }else
        {
            console.log(req.body)
            res.status(200).json({message: 'Product was successfully added '});
        }

    });
}



exports.getPosts = async (req, res)=>{

    const sql = 'SELECT * FROM posts WHERE hidden = $1  ';
    db.query(sql,[false],(error,results)=>{
        if(error)
        {
            //console.log(error)
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}







exports.getOnePost = async (req, res)=>{


    const sql = 'SELECT * FROM posts WHERE post_id = $1';
    db.query(sql,(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getClientPosts = async (req, res)=>{


    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM posts WHERE user_id = $1 and hidden = $2';
    db.query(sql,[user_id,false],(error,results)=>{
        if(error)
        {
            //console.log(error)
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.deletePost = async (req, res)=>{

    const sql = 'UPDATE posts SET hidden = $2 WHERE post_id = $1';
    db.query(sql,[req.params.post_id,true],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json({message:'Job Post Deleted'});

        }

    })
    
}


exports.updatePost = async (req, res)=>{
    
    const post_id = req.params.post_id;
    const { post_price, post_title, post_desc } = req.body;
  
    db.query(
      'UPDATE posts SET  post_price = $1, post_title = $2, post_desc= $3 WHERE post_id = $4',
      [post_price, post_title, post_desc,post_id],
      (error, results) => {
        if (error) {
            res.status(400).json({message:error.message});
        }else {res.status(200).json({message:'Your post was updated successfully'});}

        
      }
    )
}






