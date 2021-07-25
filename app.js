const express = require('express');

var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

const app = express();
app.use(express.json());



var dbConn = require('./db/database');

const userModel = require('./models/userModel');

var my_secret_key = 'sdfsdffss@#%$@#$SDFSDFSFSDF$#%@!EDFDHBFD*%^5445dfgdfgdt345345345345s9767dfgdg3534#$#$#$.,;sdfsdf345324';



app.get('/',(req,res) =>{

    res.json({ code: 200, 
        data : "Your backend server based on Node and Express is ready to role!"});

    

});

app.post('/createUser',(req,res) =>{


    
    dbConn.collection("UserData").find({email : req.body.email}).toArray(function(err, result) {
        if (err) throw err;
        
        if(result.length > 0){
            res.json({ code: 301, data : "User already exists with this email"});
        }else{

            var data1 = new userModel(req.body);
            data1.save(function (err, dataHolder) {
                if (err) return console.error(err);
        
                //console.log(dataHolder.full_name + " saved to UserData collection.");
                res.json({ code: 200, data : dataHolder.name + " saved successfully"
                 });
        
              });
        
            
        }
      });

  

});


app.post('/loginUser',(req,res) =>{


    dbConn.collection("UserData").find({email : req.body.email, password : req.body.password}).toArray(function(err, result) {
        if (err) throw err;
        
        if(result.length > 0){

            
            const data = {email : req.body.email};
            const accessToken = generateAccessToken(data);

            res.json({ code: 200, access_token : accessToken});
            
        }else{

            res.json({ code: 301, data : "Wrong email or password!"});

            
        }
      });



});

app.post('/showUserInfo',authenticateToken, (req,res) =>{


    

      dbConn.collection("UserData").find({email : req.body.email}).toArray(function(err, result) {
        if (err) throw err;
        
        if(result.length > 0){

            res.json({ code: 200, data : result});
            
        }else{

            res.json({ code: 301, data : "Wrong email or password!"});

            
        }
      });

   
    

});


function generateAccessToken(data) {
    return jwt.sign({data}, my_secret_key, { expiresIn: '1800s' });
  }

function authenticateToken(req, res, next){
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, my_secret_key, (err, user) => {
            if (err) {
                //return res.sendStatus(403);
                return res.json({ 
                    code: 403, 
                    msg : "Not Allowed"
                });
            }

            //req.user = user;
            if(req.body.email == user.data.email ){

                next();
                

            }else{

                return res.json({ 
                    code: 401, 
                    msg : "Unauthorized"
                });

            }
            
        });
    } else {
        //res.sendStatus(401);
        return res.json({ 
            code: 401, 
            msg : "Unauthorized"
        });
        
    }
};


app.listen(3000);









//192.168.31.117:3000