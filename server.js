const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, 'public')));


const server = require('http').createServer(app); // connects http library to server
const io = require('socket.io')(server); // connect websocket library to server



const SerialPort = require('serialport'); // serial library
const Readline = SerialPort.parsers.Readline; 


if (!process.argv[2]) {
  console.error('Usage: node ' + process.argv[1] + ' SERIAL_PORT');
  process.exit(1);
}


//---------------------- SERIAL COMMUNICATION (Arduino) ----------------------//
// start the serial port connection and read on newlines
// const serial = new SerialPort('/dev/tty-usbserial1');
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

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});



io.on('connect', function(socket) {
  console.log('a user connected');

  // if you get the 'ledON' msg, send an 'H' to the Arduino
  socket.on('ledON', function() {
    console.log('ledON');
    serial.write('H');
  });

  // if you get the 'ledOFF' msg, send an 'L' to the Arduino
  socket.on('ledOFF', function() {
    console.log('ledOFF');
    serial.write('L');
  });

  // if you get the 'disconnect' message, say the user disconnected
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});



app.get('/', (req,res) => res.render('index.ejs'));

server.listen(port);