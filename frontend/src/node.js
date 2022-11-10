const express = require('express')
const cors = require('cors');
const cp = require('child_process');

const app = express();
const port = 3000;

app.use(cors());

var proc;

// Execute command line invocation of robot script. 
app.get('/execute', (req, res) => {
  // Path parameter not necessary.
  // const path = "/Users/ryanlevy/CSCI";
  // const path = "/Users/kxscrobot1/Desktop";
  const command = 'python /Users/kxscrobot1/Desktop/spotifylogger-v1/spotify-pauseplay.py';
  // Test command.
  // const command = 'ls';
  console.log("Handling execute.");
  proc = cp.exec(command, (error, stdout, stderr) => {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
           console.log('exec error: ' + error);
           res.sendStatus(500);
           return;
      }
      res.send({message:`${stdout}`})
  });
});

// Kill the running robot process.
app.get('/kill', (req, res) => {
  console.log("Handling kill");
  if (proc) {
    try {
      proc.kill();
      console.log("Killed");
    }
    catch (err) {
      res.sendStatus(500);
    }
  }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));


