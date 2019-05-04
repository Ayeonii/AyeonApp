const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require("mongoose");


const config = require('./config');
const port = process.env.PORT || 3000

const path = require('path');
const bodyParser = require('body-parser');

const index = require("./routes/api/index");

//JSON과 url-encoded query를 파싱
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// request 로그를 프린트
app.use(morgan('dev'))

//jwt에 사용될 secret key 설정
app.set('jwt-secret', config.secret)

app.get('/', (req, res) => {
      res.send('연결 성공!');
});

app.use('/api', index);


app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});

//mongoDB 연결
mongoose.Promise = global.Promise
mongoose.connect(config.mongodbUri,{useNewUrlParser:true})
.then(()=>console.log('connected to mongodb server'))
.catch(e=> console.error(e))

//module.exports = app;
