const User = require('../../../models/user')
const jwt = require('jsonwebtoken')


/*
    회원가입
    POST /api/auth/signup{username, password}
*/

exports.signup = (req,res)=>{
 //   res.send('register router is working')

    console.log(req.body);
    const {username, password} = req.body
    console.log("username:" + req.body.username)
    console.log("password" + req.body.password)
    let newUser = null

    //디비에 존재하지 않으면 새로 등록
    const create = (user)=>{
        if(user){
            throw new Error('username exist')
        }else{
            return User.create(username, password)
        }
    }

    //유저의 수 구하기 
    const count = (user) =>{
        newUser = user
        return User.count({}).exec()
    }

    //유저의 수가 1일때 관리자로 할당
    const assign =(count)=>{
        if(count === 1){
            return newUser.assignAdmin()
        }else{
            return Promise.resolve(false)
        }
    }

    const respond = (isAdmin) =>{
        res.json({
            message : '회원가입이 완료되었습니다.',
            admin: isAdmin ? true : false
        })
    }

    const onError = (error) =>{
        res.status(409).json({
            message: error.message
        })
    }
    
    //아이디 중복확인 후, 가입
    User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}

/*
    POST /api/auth/signin{username, password}
*/
//로그인
exports.signin = (req,res) =>{
    const {username, password} = req.body;
    const secret = req.app.get('jwt-secret')

    //jwt생성 및 사용자 확인
    const check = (user)=>{
        if(!user){
            throw new Error('해당 회원정보가 없습니다.')
        }else{
            if(user.verify(password)) {//비밀번호 일치 확인
                const p = new Promise((resolve, reject)=>{
                    jwt.sign(
                        {
                            _id:user._id,
                            username : user.username,
                            admin: user.admin
                        },
                        secret,
                        {
                            expiresIn : '7d',
                            issuer : 'localhost',
                            subject : 'userInfo'
                        }, (err, token) =>{
                            if(err) reject(err)
                            resolve(token)
                        })
                })
                return p
            }else{
                throw new Error('login failed')
            }
        }
    }
    //token에 대한 응답
    const respond = (token) =>{
        res.json({
            message: '로그인 되었습니다.',
            token
        })
    }

    //에러 발생
    const onError = (error)=>{
        res.status(403).json({
            message: error.message
        })
    }

    //회원 찾기
    User.findOneByUsername(username)
        .then(check)
        .then(respond)
        .catch(onError)
}

//jwt검증 - 토큰을 가지고 검증한 후, 현재 계정의 상태를 보여주는 기능 
//프론트에서 access token을 url parameter로 전달하거나 또는 헤더를 x-access-token으로 설정해야함
//미들웨어 실행 성공 후에 옴
exports.check = (req, res) =>{
    res.json({
        success:true,
        info: req.decoded
    })
} 