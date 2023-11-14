const express = require('express');
const path = require('path');
var cors = require('cors')


const app = express();
const port = 3000;

app.use(cors({
  origin: "*"
}))

const loginRouter = require('./routes/login')
const signupRouter = require('./routes/sign_up')
const forgotpword = require ('./routes/Forgot_pwrod')
const Modify = require('./routes/Modify')
const deleted = require('./routes/delete')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', loginRouter)
app.use('/', signupRouter)
app.use('/', forgotpword)
app.use('/', Modify)
app.use('/', deleted)

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'home', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
