const express = require('express')
const cors = require('cors');
const cp = require('child_process');

const app = express();
const port = 3000;

app.use(cors());

// Execute command line invocation of robot script. 
app.get('/execute', (req, res) => {
  // const path = "/Users/ryanlevy/CSCI";
  // const path = "/Users/kxscrobot1/Desktop";
  const command = 'python /Users/kxscrobot1/Desktop/spotifylogger-main/spotify-pauseplay.py';
  console.log("Handling execute.");
  cp.exec(command, (error, stdout, stderr) => {
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

// Kill the robot.
app.get('/kill', (req, res) => {
  console.log("Handling kill")
  // if (proc) {
  //   try {
  //     proc.kill();
  //     console.log("Killed");
  //   }
  //   catch (err) {
  //     res.sendStatus(500);
  //   }
  // }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));


