/*
    JWT 검증 미들웨어
    GET /api/auth/check
*/

//token 검증
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    //헤더 or url에서 token 가져오기
    const token = req.headers['x-access-token'] || req.query.token
    if(!token){
        return res.status(403).json({
            success : false,
            message : '로그인 되지 않았습니다.'
        })
    }

    //token 디코딩 promise 생성
    const p = new Promise((resolve, reject) =>{
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded)=>{
            if(err) reject(err)
            resolve(decoded)
        })
    })

    const onError = (error)  =>{
        res.status(403).json({
            success : false,
            message : error.message
        })
    }

    //promise 실행
    p.then((decoded)=>{
        req.decoded = decoded
        next()
    }).catch(onError)
}

module.exports = authMiddleware