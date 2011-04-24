// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var imageObjects = {};
imageObjects.values = [];
var notifier
$(function() {
	chrome.extension.onConnect.addListener(function(port) {
  		port.onMessage.addListener(function(msg) {
			if(typeof(msg.remove)=="number")
				imageObjects.values.remove(parseInt(msg.remove));
			if(typeof(msg.replace)=="number")
				imageObjects.values.remove(parseInt(msg.replace));
				$.extend(imageObjects.values[parseInt(msg.replace)] , msg.value);
			if(msg.replace =="none" && msg.remove == "none")
				imageObjects.values.push(msg.value);
			chrome.tabs.getSelected(null, function (Tab,tab) {
          		var tabOfOrigin = Tab.id;
				notifier = chrome.tabs.connect(tabOfOrigin, {name: "listChange"})
		  		notifier.postMessage({list: "modified"});
				notifier.onMessage.addListener(function(msg) {
  					if (msg.confirm == "added")
					    notifier.disconnect();
				});
     		});
	  	});

	});

});