'use strict'

const isAdmin = (req,res,next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'server error'
        })
    }
    const { role,name } = req.user

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'unauthorized'
        })
    }
    next()
}

const hasRole = ( ...roles ) => {
    return (req,res,next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'server error'
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: 'unauthorized'
            })
        }
        next()
    }
}

module.exports = {
    isAdmin,
    hasRole
}