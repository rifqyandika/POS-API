const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'src/file')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 500000 },
    fileFilter(req, file, callback){
        if(file.originalname.match(/\.(png)\b/)){
            callback(null, true)
        }else{
            callback('image type must png')
        }
    }
})


module.exports = upload