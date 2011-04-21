$(function() {

$('#texttar').html('poop');

chrome.extension.onConnect.addListener(function(port) {

  console.assert(port.name == "sayit");

  port.onMessage.addListener(function(msg) {

      $('#texttar').html(msg.value);

  });

});

});