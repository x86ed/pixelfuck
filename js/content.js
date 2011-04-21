$(function() {
		$('body').prepend('<div class="pf-imageOverlay" class="ui-widget-content"><input type="text" id="messager"/></div>')
		$( "div.pf-imageOverlay" ).draggable();
		$('input#messager').keyup(function(){ 
			var sendVal = $(this).val();
			port = chrome.extension.connect({name: "sayit"});
			port.postMessage({value: sendVal});
		});
});
