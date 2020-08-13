var express = require('express');
var mysql = require('mysql');

var app = express();
var connection = mysql.createPool({
    //properties
    connectionLimit:50,
    host: 'localhost',
    user: 'root',
    password : '',
    database: 'sm'
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.get('/view-details',function(req,resp){
    //test query

  connection.getConnection(function(err,tempConnect){
        if(!!err){
            tempConnect.release();
            console.log("Error");
        }else{
            console.log('connected');
            tempConnect.query('SELECT S.id as student_id, S.name as Student, M.subject_id, Sub.name, M.mark FROM student S JOIN mark M ON S.id = M.student_id JOIN subject Sub ON M.subject_id = Sub.id',function(error,rows,fields){
                tempConnect.release();

                if(!!error){
                    console.log('Error in the query');
                }else{
                    resp.json(rows);
                }
            });
        }
  });
});


app.get('/student',function(req,resp){
  //test query
  connection.getConnection(function(err,tempConnect){
        if(!!err){
            tempConnect.release();
            console.log("Error");
        }else{
            console.log('connected');
            tempConnect.query('SELECT * FROM student',function(error,rows,fields){
                tempConnect.release();

                if(!!error){
                    console.log('Error in the query');
                }else{
                    resp.json(rows);
                }

            });
        }
  });
});



app.listen(1337);