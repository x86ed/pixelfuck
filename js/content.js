$(function() {
		//$('body').prepend('<div class="pf-imageOverlay" class="ui-widget-content"><input type="text" id="messager"/></div>')
		//$( "div.pf-imageOverlay" ).draggable();
		//localStorage["url"] = window.location;
		//$('body').click(function(){alert(localStorage["url"])});	
	/*	
		$('input#messager').keyup(function(){ 
			var sendVal = $(this).val();
			port = chrome.extension.connect({name: "imageObjects"});
			port.postMessage({value: sendVal});
		});
		
		$(".pf-closebutton.pf-active").click(function(e){
			var passable = this
			e.preventDefault();
			port = chrome.extension.connect({name: "imageObjects"});
			port.postMessage({remove: $(".pf-closebutton").index(passable)});
		});
		
		$(".pf-visbutton.pf-active").click(function(e){
			var passable = this
			e.preventDefault();
			port = chrome.extension.connect({name: "imageObjects"});
			port.postMessage({
				replace: $(".pf-visbutton").index(passable),
				value:{
					display : 'none'
				}
			});
		});
		
		var setPos = function(oobject){
			var passable = oobject;
			port = chrome.extension.connect({name: "imageObjects"});
			port.postMessage({
				replace: $(".pf-imageWrapper").index(passable),
				value:{
					xPos : $(passable).css('left'),
					yPos : $(passable).css('top')
				}
			});
		}
		
		var setScale = function(oobject){
			var passable = oobject;
			port = chrome.extension.connect({name: "imageObjects"});
			port.postMessage({
				replace: $(".pf-imageWrapper").index(passable),
				value:{
					width : $(passable).css('width'),
					height : $(passable).css('height')
				}
			});
		}
		
		var setCrop = function(oobject){
			var passable = oobject;
			port = chrome.extension.connect({name: "imageObjects"});
			port.postMessage({
				replace: $(".pf-imageWrapper").index(passable),
				value:{
					clipT : $(passable).find('div.pf-imgCrop').css('top'),
					clipL : $(passable).find('div.pf-imgCrop').css('left'),
					clipB : $(passable).find('div.pf-imgCrop').css('top') + $(passable).find('div.pf-imgCrop').css('height'),
					clipR : $(passable).find('div.pf-imgCrop').css('left') + $(passable).find('div.pf-imgCrop').css('width')
				}
			});
		}
});*/
