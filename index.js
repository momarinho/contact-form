const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// configure body-parser to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// handle form submissions
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // create a nodemailer transporter object
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-gmail-address',
      pass: 'your-gmail-password',
    },
  });

  // create an email message object
  const mailOptions = {
    from: 'your-gmail-address',
    to: 'recipient-email-address',
    subject: `New message from ${name} (${email})`,
    text: message,
  };

  // send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send('Error: Unable to send email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully.');
    }
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
