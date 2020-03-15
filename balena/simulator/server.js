const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs');

// Environment Variables
const port = process.env.PORT || 3001
const channel = process.env.DRONE_CHANNEL || 'drone/'
const brokerKey = process.env.DRONE_CHANNEL_KEY
const brokerPort = process.env.BROKER_PORT || 8080
const brokerHost = process.env.BROKER_HOST || "127.0.0.1"

// Read index.html file
const contentPath = path.join(__dirname+'/index.html')
fs.readFile(contentPath, (err, data) => {
  if (err) {
    context
      .headers(headers)
      .status(500)
      .fail(err);

    return;
  }


  let content = data.toString();
  content = content.replace(/__CHANNEL__/g, channel);
  content = content.replace(/__BROKER_KEY__/g, brokerKey);
  content = content.replace(/__BROKER_PORT__/g, brokerPort);
  content = content.replace(/__BROKER_HOST__/g, brokerHost);


  // Route to index page
  app.get('/*', function (req, res) {
    res.contentType('text/html').send(content).status(200);
  })

  // Listen to the port
  app.listen(port, () => console.log(`Listening on port ${port}!`))
    .on("error", (error) => {
      console.log('[ERROR] express listen ', error.message)
    })
});