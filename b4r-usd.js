// Copyright (c) 2015 Sergei Emelianov (seego). 
// http://facebook.com/sergei.emelianov
//All rights reserved.
//open for offers & ideas
//public github

var byrusd=null;

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    var mutationTarget = null;
    $.each(mutations, function(index, amutation) {
    	//this allows me to detect change of content in auto and moto baraholka
    	mutationTarget = amutation.target.className.toString();
    	if ( mutationTarget.match(/autoba-count/gi) != null ) {
    		// console.log( "found: " + amutation );	
    		changePrices('div.cost-i > p.big > a > strong');
    	} 
    });
});

//When page is loaded, we check what will be the best way to change  prices 
$(document).ready(function(){
	var uri = document.documentURI;
	if ( uri.match(/[am]b\.onliner\.by\/car|moto\/\d+/g) != null ) {
		changePrices('span.autoba-hd-details-costs > span.cost > strong');
		replaceRub('span.autoba-hd-details-costs > span.cost');
	} else if ( uri.match(/baraholka\.onliner\.by\/viewtopic\.php\?t\=\d+/g)) {
		replaceRub('ul.b-ba-topicdet > li.cost > small');
		changePrices('div.m-title > ul.b-ba-topicdet > li.cost');
	} else if (uri.match(/[am]b\.onliner\.by/g) != null ) {
		observer.observe(document.body, {
	  		subtree: true,
	  		attributes: true
		});
	} else if ( uri.match(/baraholka\.onliner\.by/g) != null ) {
		changePrices('td.cost > big > strong');
		//remove руб.
		replaceRub('td.cost > big');
	}
	
});

/**
* replaces руб.
*/
function replaceRub(lookup) {
	$(lookup).each( function(index, elem) {
			var innerTxt = elem.innerText;
			innerTxt = innerTxt.replace(/руб\./g, '');
			elem.innerText = innerTxt;
		});
}
/**
* replaces price in BYR to USD
*/
function changePrices(lookup) {
	//read current exchange rate
	if ( !byrusd ) {
		byrusd = $('li.top-informer-currency > a > span._u').text().replace(/[ \$]/g,'');
		byrusd = parseFloat(byrusd);
		// console.log("current rate: 1byr/"+byrusd);
	}

	$(lookup).each(
  		function(index, priceSection){
    		var priceByr = $(priceSection).text();
    		//checking if the price already changed
    		if ( priceByr.match(/\$/g) == null ) {
    			priceByr = priceByr.replace(/ /g,'');
    			var priceUsd = parseFloat(Math.round(priceByr/byrusd).toFixed(2));
    			$(priceSection).text("$ "+ numberWithCommas(priceUsd));	
    		}
		});
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}