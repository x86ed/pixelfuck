// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var imageObjects = {};
imageObjects.values = [];
$(function() {
	chrome.extension.onConnect.addListener(function(port) {
  		port.onMessage.addListener(function(msg) {
			chrome.tabs.getSelected(null, function (Tab,tab) {
          console.log(Tab.url);
		  //send message to that tab here
     	});
			if(typeof(msg.remove)=="number")
				imageObjects.values.remove(parseInt(msg.remove));
			if(typeof(msg.replace)=="number")
				imageObjects.values.remove(parseInt(msg.replace));
				$.extend(imageObjects.values[parseInt(msg.replace)] , msg.value);
			if(msg.replace =="none" && msg.remove == "none")
				imageObjects.values.push(msg.value);
	  	});

	});

});