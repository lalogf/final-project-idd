document.addEventListener("DOMContentLoaded", function() {
  // code...
  var titles = document.querySelectorAll('.card-title');
  document.getElementById("led-on").addEventListener("click", function(){
  	titles.forEach(function(title){
  		title.innerHTML = "Lalo Gonzalez"
  	})
  });

});