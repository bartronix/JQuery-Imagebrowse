/* imagebrowse.js - v0.1 - 2014-05-12
*  http://bartleemans.be/
*  Copyright (c) 2014 Bart Leemans 
*  Dual licensed under the MIT and GPL licenses:
*  http://malsup.github.com/mit-license.txt
*  http://malsup.github.com/gpl-license-v2.txt
*/
;(function($) { 
	"use strict";
    	$.fn.imagebrowse = function( options ) {         
		var startPosX = 0;
		var startPosY = 0;
		var zIndex = 999;
		var idIndex = 1;
		var imageArray = [];				
		var container = this;
		$(this).children('img').each(function(i) {
			$(this).attr("id","img-"+idIndex);
			imageArray.push("img-"+idIndex);			
			$(this).css({'left' : startPosX+'px', 'top' : startPosY+'px', 'z-index' : zIndex, 'position' : 'absolute'});
			startPosX += 10;
			startPosY += 10;
			zIndex--;
			idIndex++;		
        	});		
		$(this).css({"position":"relative"});
		resizeContainer();
		var clickIndex = 2;
		var maxIndex = $(this).find("img").length;
		$(this).css("cursor","pointer");
		
		$(document).keydown(function(e) {			
			if(e.which == 37){
				showImage();
				if(clickIndex == 1) {
					clickIndex = maxIndex;
				} else {
					clickIndex--;
				}
			}
			if(e.which == 39) {
				showImage();
				if(clickIndex == maxIndex) {
					clickIndex = 1;
				} else {
					clickIndex++;
				}
			}			
		});
		
		$(this).click(function() {
			showImage();
			if(clickIndex == maxIndex) {
				clickIndex = 1;
			} else {
				clickIndex++;
			}
		});
		
		function showImage(){			
			var imageArrayDuplicate = imageArray.slice();			
			for(var i = 0; i < clickIndex; i++) {
				imageArrayDuplicate.push(imageArrayDuplicate.shift());
			}
			imageArrayDuplicate.splice($.inArray("img-"+clickIndex, imageArrayDuplicate), 1 );			
			startPosX = 10;
			startPosY = 10;
			var zIndex = 999;
			jQuery.each(imageArrayDuplicate, function(i, val) {
				$('#'+val).css({'left' : startPosX+'px', 'top' : startPosY+'px', 'z-index': zIndex});
				startPosX += 10;
				startPosY += 10;
				zIndex--;
				$('#'+val).fadeOut().hide().fadeIn();
			});			
			$("#img-"+clickIndex).css({'left' : '0px', 'top' : '0px', 'z-index' : 1000}).hide().fadeIn();			
		}
		
		$(window).resize(function() {
			resizeContainer();
		});
		
		function resizeContainer() {
			if((container).length) {
				var height = 0;
				$(container).children('img').each(function(i) {
					if($(this).height() > height) {
						height = $(this).height();
					}
				});
				$(container).css({"height":(height+50)+"px"});
			}
		}
    }; 
}(jQuery));
