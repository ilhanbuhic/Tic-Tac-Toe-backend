const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
  name: String,
  picture: Buffer,
})

const Picture = mongoose.model('Picture', pictureSchema)

module.exports = Picture
