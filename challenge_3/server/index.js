const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();

const { ensureUniqueEmail, saveAccount, saveShipping, saveCc } = require('./mongo/index');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use('/api', router);


// Form 1: Saves name, email, password
// Body: name, email, password (PLAINTEXT)
router.post('/checkout/account', async (req, res) => {
  try {
    let accountIfExists = await ensureUniqueEmail(req.body);
    if (!accountIfExists) {
      let userDoc = await saveAccount(req.body);
      res.status(201).json({ message: 'Account created' });
    } else {
      res.status(409).json({ error: 'Email already exists' });
    }
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Form 2: Saves address, phone num
// Body: email, address { line1, line2, city, state, zip }, phone
router.post('/checkout/shipping', async (req, res) => {
  try {
    let accountIfExists = await ensureUniqueEmail(req.body);
    if (accountIfExists) {
      let updatedUserDoc = await saveShipping(req.body);
      res.status(201).json({ message: 'Shipping details saved' });
    } else {
      res.status(404).json({ error: 'Account does not exist' });
    }
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Form 3: Saves CC info
// Body: email, cc { cardNo, expiry, cvv, billingZip }
router.post('/checkout/cc', async (req, res) => {
  try {
    let accountIfExists = await ensureUniqueEmail(req.body);
    if (accountIfExists) {
      let updatedUserDoc = await saveCc(req.body);
      res.status(201).json({ message: 'Credit card details saved' });
    } else {
      res.status(404).json({ error: 'Account does not exist' });
    }
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// For react-router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
