# angular-ganalytics
Google Analytics interaction for AngularJS.
Tracks every single view instead of just the main index. It also tracks file downloads.

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
