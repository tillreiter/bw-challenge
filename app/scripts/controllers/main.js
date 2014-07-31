'use strict';

angular.module('bwChallengeApp')
  .controller('MainCtrl', function ($scope, Topics) {

    $scope.dataLoaded = false;

    $scope.setStyle = function (topic) {

      var popularityTextSize = 16 + (topic.relativeTextSize * 5);

      return {'color': topic.sentimentTextColor, 'font-size': popularityTextSize, 'text-align': topic.randomAlignment};
    };

    $scope.topics = "Data loading";

    Topics.getJSON().success(function (data) {
      $scope.topics = data.topics;
      console.log('loading data finished');
      $scope.preparedTopics = Topics.prepare($scope.topics);
      $scope.dataLoaded = true;
    });


  });

