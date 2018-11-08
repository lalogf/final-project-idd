var videoOnPage;

// WebSocket connection setup
var socket = io();


document.addEventListener("DOMContentLoaded", function() {
  // code...
  var titles = document.querySelectorAll('.card-title');
  document.getElementById("led-on").addEventListener("click", function(){
  	if (videoOnPage.state() === "playing") {
  		videoOnPage.pause();
  		this.innerHTML = "Play Video";
  		document.getElementById("body").style.background = "#fff"
  	} else {
  		videoOnPage.play();
  		this.innerHTML = "Pause Video";
  		document.getElementById("body").style.background = "#000"
  	}
  });
});


window._wq = window._wq || [];
_wq.push({ id: 'u8p9wq6mq8', onReady: function(video) {
	console.log("I got a handle to the video!", video);
	videoOnPage = video;
}});



// send out LedOn message over socket
function ledON() {
  socket.emit('ledON');
}