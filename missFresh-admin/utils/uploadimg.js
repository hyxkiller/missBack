const multer = require('multer')  //处理multipart/form-data数据格式(主要用在上传功能中)的中间件。
const mime = require('mime')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + new Date().getTime() + '.' + mime.getExtension(file.mimetype))
    })
  }
})

module.exports = multer({storage})
