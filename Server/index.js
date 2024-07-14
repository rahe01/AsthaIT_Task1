const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {
  const { firstName, surname, mobileOrEmail, password, day, month, year, gender } = req.body;

  // Basic validation
  if (!mobileOrEmail) {
    return res.status(400).json({ error: 'Mobile or email address is required' });
  }

  if (!day || !month || !year) {
    return res.status(400).json({ error: 'Date of birth is required' });
  }

  if (!gender) {
    return res.status(400).json({ error: 'Gender is required' });
  }

  // Further validation can be added here

  // If validation passes
  res.status(200).json({ message: 'Signup successful' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
