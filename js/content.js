$(function() {
		chrome.extension.onRequest.addListener(
  			function(request, sender, sendResponse) {
   				 console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    		if (request.greeting == "hello"){
      			sendResponse({farewell: "goodbye"});
    		}else{
      			sendResponse({}); // snub them.
  			});
		$('body').prepend('<div class="pf-imageOverlay" class="ui-widget-content"><p>Drag me around</p></div>')
		$( "div.pf-imageOverlay" ).draggable();
});
