const mongoose = require('mongoose');

let addressSchema = new mongoose.Schema({
  email: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  zip: Number
});

// In reality we SHOULD NEVER save cc details in our DB
let ccSchema = new mongoose.Schema({
  email: String,
  cardNo: Number,
  expiry: Date,
  cvv: Number,
  billingZip: Number
});

let passwordSchema = new mongoose.Schema({
  email: String,
  hash: String // bcrypt hashed
});

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: addressSchema,
  phone: String,
  cc: ccSchema,
  password: passwordSchema
});

module.exports.Address = mongoose.model('Address', addressSchema);
module.exports.CreditCard = mongoose.model('CreditCard', ccSchema);
module.exports.User = mongoose.model('User', userSchema);
module.exports.Password = mongoose.model('Password', passwordSchema);