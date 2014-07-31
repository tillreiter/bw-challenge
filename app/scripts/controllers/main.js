'use strict';

angular.module('bwChallengeApp')
  .controller('MainCtrl', function ($scope, Topics) {


    $scope.dataLoaded = false;
    $scope.currentTopic = {
      label: "/ ",
      volume: "/ ",
      sentiment: {
        positive: "/ ",
        neutral: "/ ",
        negative: "/ "
      }
    };

    $scope.setStyle = function (topic) {
      var popularityTextSize = 12 + (topic.relativeTextSize * 5);
      return {'color': topic.sentimentTextColor, 'font-size': popularityTextSize, 'text-align': topic.randomAlignment};
    };

    $scope.showInfo = function (topic) {
      $scope.currentTopic = topic;
    };

    Topics.getJSON().success(function (data) {
      $scope.topics = data.topics;
      console.log('loading data finished');
      $scope.preparedTopics = Topics.prepare($scope.topics);
      console.log('preparing data finished');
      $scope.dataLoaded = true;
    });

  });

