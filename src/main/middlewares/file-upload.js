const fileUpload = require('express-fileupload')
module.exports = fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
})
