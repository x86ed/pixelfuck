$(function() {
		chrome.extension.onConnect.addListener(function(port) {
  			port.onMessage.addListener(function(msg) {
    		if (msg.list == "modified")
      			port.postMessage({confirm: "added"});
				var bgOb = chrome.extension.getBackgroundPage().imageObjects.values;
				if(bgOb.length){
					for(var i = 0;i < bgOb.length;i++){
						$("div.pf-picListMask ul").prepend(
							'<li><div class="pf-visible"></div><div class="pf-path">' +bgOb[i].url+ '</div><img class="pf-thumb" src="' + bgOb[i].url + '" alt=""/><div class="pf-delete"></div></li>'
						);
					}
				}
  			});
		});
		
		
		$("#pf-loadButton").click(function(e){
			e.preventDefault();
			
			port = chrome.extension.connect({name: "imageObjects"});
			port.postMessage({
				value: {
					url: $("#pf-newFile").attr('value'),
					width : "",
					height: "",
					xPos : "",
					yPos : "",
					zIndex : "",
					opacity : "",
					clipT : "",
					clipR : "",
					clipB : "",
					clipL : "",
					display : ""
				},
				remove: "none",
				replace: "none" 
			});
			//code below needs to be triggered after a message is sent back. possibly instead of being used twice just attached to a listener.
			bgOb = chrome.extension.getBackgroundPage().imageObjects.values;
			if(bgOb.length){
				for(var i = 0;i < bgOb.length;i++){
					$("div.pf-picListMask ul").prepend(
						'<li><div class="pf-visible"></div><div class="pf-path">' +bgOb[i].url+ '</div><img class="pf-thumb" src="' + bgOb[i].url + '" alt=""/><div class="pf-delete"></div></li>'
					);
				}
			}
		});

});