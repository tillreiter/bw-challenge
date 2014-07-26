'use strict';

angular.module('bwChallengeApp')
  .controller('MainCtrl', function ($scope, topics) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.topics = topics.content;
  })


