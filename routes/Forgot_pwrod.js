const express = require('express')
const router = express.Router()
const app = express();
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const twilio = require('twilio');
const randomstring = require('randomstring');

const mysql = require('../Sql_connection')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes
router.post('/forgot-password', (req, res) => {
  // Implement the "forgot password" logic here
  // Generate a new password
  const newPassword = generateNewPassword();

  // Send the password via SMS to the user
  sendSMS("+216"+req.body.phoneNumber, newPassword);

  console.log(newPassword)
  console.log("HELLO")
  
  bcrypt.hash(newPassword, 10)
  .then(hash => {
    // Check if tel already exists in database
    mysql.query('UPDATE adhérent SET mp = ? WHERE num = ?', [hash, req.body.phoneNumber], (err, result) => {
      if (err) {
        console.log(err) 
        res.json({message: 'Internal server Error'})    
      }
      else {
        console.log("success")
        res.json({ message: 'Password sent successfully' });
      }
    })
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });

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
