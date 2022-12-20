const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: String,
  city: String,
  postalCode: String,
  country: String,
});

const userSchema = mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
});

const requestSchema = mongoose.Schema({
  text: String,
  user: userSchema,
  address: addressSchema,
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "artists" },
  dateEvent: Date,

});

const Request = mongoose.model("requests", requestSchema);

module.exports = Request;
