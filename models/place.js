const mongoose = require('mongoose')
const { Schema } = mongoose

const placeSchema = new Schema({
  name: String,
  location: String,
  description: String,
  imageAsset: String,
  openDay: String,
  openHour: String,
  ticketPrice: String,
  galeries: [String],
}, {timestamps: true})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place