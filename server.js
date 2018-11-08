const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const http = require('http').Server(app); // connects http library to server
const io = require('socket.io')(http); // connect websocket library to server

// const http = require('http').Server(app); // connects http library to server
const SerialPort = require('serialport'); // serial library
const Readline = SerialPort.parsers.Readline; 


// check to make sure that the user provides the serial port for the Arduino
// when running the server
if (!process.argv[2]) {
  console.error('Usage: node ' + process.argv[1] + ' SERIAL_PORT');
  process.exit(1);
}

//---------------------- SERIAL COMMUNICATION (Arduino) ----------------------//
// start the serial port connection and read on newlines
const serial = new SerialPort(process.argv[2], {});
const parser = new Readline({
  delimiter: '\r\n'
});

// Read data that is available on the serial port and send it to the websocket
serial.pipe(parser);
parser.on('data', function(data) {
  console.log('Data:', data);
  io.emit('server-msg', data);
});




app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, 'public')));







app.get('/', (req,res) => res.render('index.ejs'))
app.listen(port);
