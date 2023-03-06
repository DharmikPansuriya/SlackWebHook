// As take home assignment mentions, I have created following flow:
// 1. First created Webhook from slack api (My perosnal workspace)
// 2. Created a express server to listen to the post request with payload given in assignment
// 3. Checked if payload Type is SpamNotification or not
// -> If it is spam then, send alert to Slack team.
// -> Else do nothing

// Importing require modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
require("dotenv").config();

// Configure body parser middleware to handle incoming JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
// Convert payload into JSON
app.use(bodyParser.json());

// URL of Slack webhook to send spam notifications
// This webhook should be migrated to .env file.
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

// Handle incoming POST requests to /payload endpoint
app.post('/payload', (req, res) => {
  const payload = req.body;

  // Check if payload is a spam notification
  if (payload.Type === 'SpamNotification') {

    // Format message to send to Slack
    const message = `*New Spam Notification*\nEmail Address: ${payload.Email}`;

    // Send message to Slack using Axios
    axios.post(SLACK_WEBHOOK_URL, { text: message })
      .then(() => console.log('Slack notification sent!'))
      .catch((error) => console.error('Error sending Slack notification: ', error));
  }

  // Send a success response back to the client
  res.status(200).send('Payload processed successfully');
});

// Start the server and listen on a port
// This port number shuold be migrated to .env file
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));