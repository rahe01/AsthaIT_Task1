const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return date && date.getDate() === parseInt(day) && date.getMonth() === (month - 1);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidMobile(mobile) {
  const mobileRegex = /^[0-9]{10,15}$/;
  return mobileRegex.test(mobile);
}

app.post('/signup', (req, res) => {
  const { firstName, surname, mobileOrEmail, password, day, month, year, gender } = req.body;

  if (!mobileOrEmail) {
    return res.status(400).json({ error: 'Mobile or email address is required' });
  }

  if (!isValidEmail(mobileOrEmail) && !isValidMobile(mobileOrEmail)) {
    return res.status(400).json({ error: 'Invalid email or mobile number' });
  }

  if (!day || !month || !year || !isValidDate(day, month, year)) {
    return res.status(400).json({ error: 'Invalid date of birth' });
  }

  if (!gender) {
    return res.status(400).json({ error: 'Gender is required' });
  }

  res.status(200).json({ message: 'Signup successful' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
