'use strict'

const path = require('path')
const { v4: uuid } = require('uuid')

const uploadFileHelper = ( files, extsAllowed = ['jpg','jpeg','png'], carpeta = '' ) => {
    return new Promise((res,rej) => {
        const { file } = files
        const extFile = file.name.split('.')
        const ext = extFile[ extFile.length - 1 ]
        
        if (!extsAllowed.includes(ext)) {
            return rej(Denied)
        }
    
        const tempName = uuid() + '.' + ext
        const uploadPath = path.join( __dirname + '../uploads/'+ carpeta + tempName )
    
        file.mv(uploadPath, function(err) {
            if (err) {
                return rej(err)
            }
    
            res(tempName);
        })
    })
}

module.exports = {
    uploadFileHelper
}