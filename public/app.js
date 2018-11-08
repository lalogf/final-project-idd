var videoOnPage;

// WebSocket connection setup
var socket = io();


// document.addEventListener("DOMContentLoaded", function() {
//   // code...
//   var titles = document.querySelectorAll('.card-title');
//   document.getElementById("led-on").addEventListener("click", function(){
//   	if (videoOnPage.state() === "playing") {
//   		videoOnPage.pause();
//   		this.innerHTML = "Play Video";
//   		document.getElementById("body").style.background = "#fff";
//       socket.emit('ledON');
//     } else {
//       videoOnPage.play();
//       this.innerHTML = "Pause Video";
//       document.getElementById("body").style.background = "#000";
//       socket.emit('ledOFF');
//     }
//   });
// });


window._wq = window._wq || [];
_wq.push({ id: 'u8p9wq6mq8', onReady: function(video) {
	console.log("I got a handle to the video!", video);
	videoOnPage = video;
}});



// // send out LedOn message over socket
// function ledON() {
//   socket.emit('ledON');
// }

// // send out ledOFF message over socket
// function ledOFF() {
//   socket.emit('ledOFF');
// }

socket.on('server-msg', function(msg) {
  msg = msg.toString();
  switch (msg) {
    case "light":
      // videoOnPage.pause();
      // document.getElementById("body").style.background = "#fff";
      // console.log("ligths on");
      if (videoOnPage.state() === "playing") {
        videoOnPage.pause();
        // document.getElementById("led-on").innerHTML = "Play Video";
        document.getElementById("body").style.background = "#fff";
        socket.emit('ledON');
      } else {
        videoOnPage.play();
        launchIntoFullscreen(videoOnPage);
        // document.getElementById("led-on").innerHTML = "Pause Video";
        document.getElementById("body").style.background = "#000";
        socket.emit('ledOFF');
      }
      break;
      case "dark":
      // videoOnPage.play();
      // document.getElementById("body").style.background = "#000";
      // console.log("lights on");
      break;
      default:
      //console.log("something else");
      break;
    }
  });




