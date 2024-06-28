var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'your-secret-key'; // Replace with a secure secret key


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
      // Check if the user already exists
      let user = await userModel.findOne({ email });
      if (user) {
          return res.status(400).json({ msg: 'userModel already exists' });
      }

      // Create a new user
      user = new userModel({
          fullname,
          email,
          password
      });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user
      await user.save();

      // Create and sign a JWT
      const payload = {
          user: {
              id: user.id
          }
      };

      jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
          if (err) throw err;
          res.json({ token });
      });

  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if the user exists
      let user = await userModel.findOne({ email });
      if (!user) {
          return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Create and sign a JWT
      const payload = {
          user: {
              id: user.id
          }
      };

      jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
          if (err) throw err;
          res.send('login successfull');
      });

  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

module.exports = router;
