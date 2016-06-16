/**
 * @ngdoc module
 * @name angular-ganalytics
 * @description Tracking of individual pages.
 */
'use strict';
angular.module('analytics',[])
	.provider('trackingCode', function googleAnalyticsProvider(){
		var trackingCode;
		this.setTrackingCode = function (ua){
			trackingCode = ua;
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


		$rootScope.$on('$viewContentLoaded', function() {
			$window.ga('send', 'pageview', $location.path());
		});
	});