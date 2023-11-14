const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const mysql = require('../Sql_connection')
const twilio = require('twilio');
const randomstring = require('randomstring');



// Sign-up endpoint
router.post('/signup', (req, res) => {
  const Customer_name = req.body.nomAd;
  const profile_pic = req.body.image;
  const prenom = req.body.prenomAd;
  const sport = req.body.sport;
  const date = req.body.date;
  const tel = req.body.tel;
  let numexists = false;
  let prenomExists = false;
  if (Customer_name !== '' && profile_pic !== '' && prenom !== '' & sport !=='' & date !=='' & tel !=='') {

    const newPassword = generateNewPassword();

    // Send the password via SMS to the user

    // Hash password
  bcrypt.hash(newPassword, 10)
  .then(hash => {
    // Check if tel already exists in database
    mysql.query('SELECT * FROM adhérent where num=?', [tel], (err, results) => {
      if (err) {
        console.error('Error', err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length > 0)  {
        console.log('tel already exists!')
        numexists = true;
      }

      // Check if name already exists in database
      mysql.query('SELECT * FROM adhérent where prenomAd=?', [Customer_name], (err, results) => {
        if (err) {
          console.error('Error', err);
          res.status(500).json({ message: 'Internal server error' });
        } else if (results.length > 0)  {
          console.log('Username already exists!')
          prenomExists = true;
        }

        // If email or username already exists, send response and end function
        if (prenomExists){
          res.json({ message: 'Username already exists!' });
        } 
        else if (numexists) {
          res.json({ message: 'tel already exists!' });
        } else {

          // Insert new user into MySQL database
          mysql.query('INSERT INTO adhérent (nomAd, prenomAd, dateN, sportPrinciplae, mp, image, num) VALUES (?, ?, ?, ?, ?, ?, ?)', [Customer_name, prenom, date, sport, hash, profile_pic, tel], (err, results) => {
            if (err) {
              console.error('Error inserting new user into MySQL:', err);
              res.status(500).json({ message: 'Internal server error' });
            } else {
              res.json({ message: 'User created successfully' });
              sendSMS("+216"+tel, newPassword);

            }
          });
        }
      });
    });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });
  }
  else {
    res.json({message: 'fields are empty!'})
  }

  
});

// Helper function to generate a new password
function generateNewPassword() {
  // Generate a random string as the new password
  const passwordLength = 8;
  const newPassword = randomstring.generate({
    length: passwordLength,
    charset: 'alphanumeric',
  });

  return newPassword;
}

// Helper function to send an SMS using Twilio
function sendSMS(phoneNumber, password) {
  const accountSid = 'AC610199a459c01a71bac63219bc871ea1';
  const authToken = 'a7c341c484c68b85372d2993b43e4830';
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: `Your new password is: ${password}`,
      from: '+13156268810',
      to: phoneNumber
    })
    .then(message => console.log(`SMS sent. SID: ${message.sid}`))
    .catch(error => console.error(`Error sending SMS: ${error}`));
}

module.exports = router