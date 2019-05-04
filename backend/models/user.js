const mongoose = require('mongoose');
const crypto = require('crypto') //비밀번호 암호화 저장.
const Schema = mongoose.Schema;
const config = require('../config')

const User = new Schema({
    username : {type: String, unique: true},
    password : {type: String, required : true},
    admin : { type: Boolean ,default:false}
})

//사용자 도큐먼트 생성. 즉 새로운 사용자 생성
User.statics.create = function(username, password){
    const encrypted = crypto.createHmac('sha1', config.secret)
                            .update(password)
                            .digest('base64')
    
    const user = new this({
        username,
        password : encrypted
    })
    return user.save();
}

//username을 통해 user 한명 찾기 
User.statics.findOneByUsername = function(username){
    return this.findOne({
        username : username
    }).exec()
}

//비밀번호 일치 확인 
User.methods.verify = function(password){
    const encrypted = crypto.createHmac('sha1', config.secret)
                            .update(password)
                            .digest('base64')

    return this.password === encrypted
}

//관리자 or 사용자 구분
User.methods.assignAdmin = function(){
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('User', User);