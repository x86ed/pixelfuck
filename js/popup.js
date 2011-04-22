$(function() {
		//refreshing the image object from the content page
		//bg = chrome.extension.getBackgroundPage()
		//$("#pf-newFile").attr('value',String(bg.imageObjects.values[0]["url"]));
		
		$("pf-loadButton").click(function(e){
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
		});

});