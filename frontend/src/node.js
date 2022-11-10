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
  const command = 'python';
  const args = ['/Users/kxscrobot1/Desktop/spotifylogger-main/spotify-pauseplay.py'];
  // Test command.
  // const command = 'node';
  // const args = ['/Users/ryanlevy/Desktop/test-program.js'];
  console.log("Handling execute.");
  // proc = cp.exec(command, (error, stdout, stderr) => {
  //     if (error !== null) {
  //          console.log('exec error: ' + error);
  //          res.sendStatus(500);
  //          return;
  //     }
  //     res.send({message:`${stdout}`});
  //     return;
  // });
  try {
    proc = cp.spawn(command, args, {detached: true});
    proc.stdout.on('data', data => {
      console.log(`stdout:\n${data}`);
    });
    res.send({message: 'Successfully executed'});
    return;
  }
  catch (err) {
    res.sendStatus(500);
    return;
  }
});

// Kill the running robot process.
app.get('/kill', (req, res) => {
  console.log("Handling kill");
  if (proc) {
    try {
      process.kill(-proc.pid);
      console.log("Killed");
      res.send({message:'Killed'});
      return;
    }
    catch (err) {
      res.sendStatus(500);
    }
  }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));


