/**
 * @ngdoc module
 * @name angular-ganalytics
 * @description Tracking of individual pages.
 */
(function(){
  'use strict';
  angular.module('analytics',[]).run(function($rootScope,$window,$location) {
    $rootScope.$on('$viewContentLoaded', function() {
      $window.ga('send', 'pageview', $location.path());
    });
  });
})();
