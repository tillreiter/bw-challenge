'use strict';

angular.module('bwChallengeApp', ['angular-loading-bar'])

  //include a loading bar for http request
  .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 10;
  }])