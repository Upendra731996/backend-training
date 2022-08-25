const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const moment = require('moment');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://upendra:wvUNUF1FjJ02PCPH@cluster0.b8yrh4n.mongodb.net/upendra123?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

const time =moment()
app.use ('/account',
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        
        

        next();
       
  }
  );

app.use('/account', function(req, res, next) {
    let timeStamp= moment().format("DD-MM-YYYY,HH:mm:ss")//new Date( )
    let ipaddress=req.ip;
    let url=req.originalUrl
    console.log(timeStamp,ipaddress,url )
      next();
    
  });





app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});