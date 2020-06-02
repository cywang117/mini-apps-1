const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Address, CreditCard, User, Password } = require('./models');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/checkout',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(console.error);

// Returns email if exists, else null
exports.ensureUniqueEmail = async ({ email }) => {
  let docIfExists = await User.findOne({ email });
  return docIfExists;
};

// First form page - save user, email, HASHED password
exports.saveAccount = async ({ name, email, password }) => {
  let hash = await bcrypt.hash(password, 10)
    .catch(err => {
      console.error(err);
      return null;
    });
  const pass = new Password({
    email,
    hash
  });
  let savedPasswordDoc = await pass.save();
  let user = new User({
    name,
    email,
    password: savedPasswordDoc
  });

  return await user.save();
};

// Second form page - save address, phone num, email as redundancy
exports.saveShipping = async ({ email, address, phone }) => {
  let { line1, line2, city, state, zip } = address;
  let addrDoc = await Address.findOneAndUpdate(
    { email },
    { email, line1, line2, city, state, zip },
    { upsert: true, new: true }
  );

  return await User.findOneAndUpdate(
    { email },
    { address: addrDoc, phone },
    { new: true }
  );
};

// Again, we SHOULD NEVER save cc info in actual apps
// Third form pg - save cc, email again as redundancy
exports.saveCc = async ({ email, cc }) => {
  let { cardNo, expiry, cvv, billingZip } = cc;
  let ccDoc = await CreditCard.findOneAndUpdate(
    { email },
    { email, cardNo, expiry, cvv, billingZip },
    { upsert: true, new: true }
  );

  return await User.findOneAndUpdate(
    { email },
    { cc: ccDoc },
    { new: true }
  );
};