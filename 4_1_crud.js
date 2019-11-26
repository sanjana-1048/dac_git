var mysql=require("mysql");
var express=require("express");
var app=express();
var connection=mysql.createConnection({
host:"localhost",
database:"DAC",
user:"dac",
password:"dac"
});
connection.connect();
console.log("Git ");
app.use(express.json());
app.get("/emps",(request,response)=>{
var queryText="select * from EMP ";
connection.query(queryText,(err,result)=>{
    if(err==null)
    {
        response.send(JSON.stringify(result));
    }
    else{
        response.send(JSON.stringify(err));
    }

});

});
app.get("/emps/:NO",(request,response)=>
{
var queryText=`select * from EMP where NO=${request.params.NO}`;
connection.query(queryText,(err,result)=>{
if(err==null)
{
    response.send(JSON.stringify(result));
}
else{
    response.send(JSON.stringify(err));
}
});
}
);

app.post("/emps",(request,response)=>{
var NO=request.body.NO;
var NAME=request.body.NAME;
var AGE=request.body.AGE;
var CITY=request.body.CITY;
var queryText=`insert into EMP values (${NO},'${NAME}',${AGE},'${CITY}')`;
connection.query(queryText,(err,result)=>{
if(err==null)
{
    response.send(JSON.stringify(result));
}
else
{
response.send(JSON.stringify(err));
}
});
});

app.put("/emps/:NO",(request,response)=>{
var NO=request.params.NO;
var NAME=request.body.NAME;
var AGE=request.body.AGE;
var CITY=request.body.CITY;

var queryText=`update EMP set NAME='${NAME}',AGE=${AGE},CITY='${CITY}' where NO=${NO}`;
connection.query(queryText,(err,result)=>{
    if(err==null)
    {
        response.send(JSON.stringify(result));
    }
    else{
        response.send(JSON.stringify(err));
    }

});

});
app.delete("/emps/:NO",(request,response)=>{
    var NO=request.params.NO;
    var queryText=`delete from EMP where NO=${NO}`;
    connection.query(queryText,(err,result)=>
    {
if(err==null)
{
    response.send(JSON.stringify(result));
}
else{
    response.send(JSON.stringify(err));
}
    });
});



app.listen(9988,()=>{
    console.log("Server Started.....");
}
);
