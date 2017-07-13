# angular-ganalytics
Google Analytics for AngularJS. Tracks every single view instead of just the main index.

## Installation

    bower install --save angular-ganalytics

## Usage

Add the module `analytics` to your app

    angular
    .module('MyAngularJSApp', [
        'analytics'        
    ])

In the app configuration set the tracking code

    angular
    .config(function(trackingCodeProvider) {
        trackingCodeProvider.setTrackingCode('UA-XXXXXXX-X');
    })
