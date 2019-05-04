const User = require('../../../models/user')


/*
    GET /api/admin/list
*/

//사용자 리스트
exports.list = (req, res) =>{
    //거부
    if(!req.decoded.admin){
        return res.status(403).json({
            message: '관리자가 아닙니다.'
        })
    }

    User.find({})
        .then(
            users=>{
                res.json({users})
            }
        )
}

/*
    POST /api/admin/assign-admin/:username
*/

// 관리자권한 할당 
exports.assignAdmin = (req,res) =>{
    //관리자 아닐 시, 거부
    if(!req.decoded.admin){
        return res.status(403).json({
            message: '관리자가 아닙니다.'
        })
    }

    User.findOneByUsername(req.params.username)
        .then(
            user=>user.assignAdmin
        ).then(
            res.json({
                success:true
            })
        )
}