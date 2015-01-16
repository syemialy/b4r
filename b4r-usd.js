// Copyright (c) 2015 Sergei Emelianov (seego). 
// http://facebook.com/sergei.emelianov
//All rights reserved.

var byrusd=15310;
var timeout = null;
var priceChanged = null;

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    console.log(mutations, observer);
    // ...
});

$(document).ready(function(){
	observer.observe(document.body, {
  	subtree: true,
  	attributes: true
	});
});

function priceChange() {
		console.log('priceChange is fired');
		var changedPrices = 0;
  		$('div.cost-i > p.big > a >strong').each(
      		function(index, priceSection){
      			changedPrices++;
        		var priceByr = $(priceSection).text();
        		priceByr = priceByr.replace(/ /g,'');
        		$(priceSection).text(parseFloat(Math.round(priceByr/byrusd).toFixed(2)));
    		});
  		if (changedPrices > 0) {
  			priceChanged = 1;
  		}
};