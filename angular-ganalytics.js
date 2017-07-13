/**
* @ngdoc module
* @name angular-ganalytics
* @description Tracking of individual pages.
*/
'use strict';
angular.module('analytics',[])
.provider('trackingCode', function trackingCodeProvider(){

	var trackingCode;
	this.setTrackingCode = function (ua){
		trackingCode = ua;
		console.log(trackingCode);

	};

	this.$get = function(){
		return trackingCode;
	}
})
.run(function($rootScope,$window,$location, trackingCode) {
	(function(i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function() {
			(i[r].q = i[r].q || []).push(arguments)
		}, i[r].l = 1 * new Date();
		a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m)
	})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

	ga('create', trackingCode);

	$rootScope.$watch(function () {
		return document.body.innerHTML;
	}, function(val) {
		if (typeof jQuery != 'undefined') {
			jQuery(document).ready(function($) {


				var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
				var baseHref = '';
				if (jQuery('base').attr('href') != undefined)
				baseHref = jQuery('base').attr('href');

				jQuery('a').each(function() {

					var href = jQuery(this).attr('href');
					
					//console.log(href);
					if (href && (href.match(/^https?\:/i)) && (!href.match(document.domain))) {
						jQuery(this).click(function() {
							var extLink = href.replace(/^https?\:\/\//i, '');
							ga('send', 'event', 'External', 'Click', extLink);

							if (jQuery(this).attr('target') != undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
								setTimeout(function() { location.href = href; }, 200);

								return false;
							}
						});
					}
					else if (href && href.match(/^mailto\:/i)) {
						jQuery(this).click(function() {
							var mailLink = href.replace(/^mailto\:/i, '');
							ga('send', 'event', 'Email', 'Click', mailLink);

						});
					}
					else if (href && href.match(filetypes)) {
						jQuery(this).click(function() {
							var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
							var filePath = href;
							ga('send', 'event', 'Download', 'Click-' + extension, filePath);

							if (jQuery(this).attr('target') != undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
								setTimeout(function() { location.href = baseHref + href; }, 200);
								return false;
							}
						});
					}
				});
			});
		}
	});

	$rootScope.$on('$viewContentLoaded', function() {
		var page = $location.absUrl().replace(new RegExp("(https?://)?"+$location.host()+"(:"+$location.port()+")?"), "");
		$window.ga('send', 'pageview', page);

	});


});
