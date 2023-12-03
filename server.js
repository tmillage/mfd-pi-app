const express = require('express'); //Line 1
const sender = require('./sender');

const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

app.get("/send", (req, res) => {
  var app = req.query.app || "";
  var cmd = req.query.cmd || "";

  if(app === "" || cmd === "") {
    res.send({status:"NO_COMMAND"});
    return;
  }

  const application = require('./application');
  application.load(app);

  var keystrokes = application.commands[cmd] || "";

  console.log(`${app}:${cmd}:${application.window}:${keystrokes}`);

  if(keystrokes === "") {
    res.send({status:"NO_KEYSTROKE"});
    return;
  }

  sender.send(application.window, keystrokes);
  res.send({status:"OK"});
});