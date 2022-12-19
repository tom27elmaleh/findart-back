const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  city: String,
  postalCode: String,
  country: String,
});

const ratesSchema = mongoose.Schema({
  hourly: Number,
  package: Number,
});

const artistSchema = mongoose.Schema({
  token: String,
  type: String,
  email: String,
  username: String,
  password: String,
  photo: String,
  description: String,
  insta: String,
  address: addressSchema,
  rate: ratesSchema,
  instrument: String,
  formatPhoto: String,
  camera: String,
  link: String,
  style: String,
  event: { type: mongoose.Schema.Types.ObjectId, ref: "events" },
});

const Artist = mongoose.model("artists", artistSchema);

module.exports = Artist;
