'use strict';

angular.module('bwChallengeApp')

  //include Topics service in controller for data retrieval and preperation
  .controller('MainCtrl', function ($scope, Topics) {

    //create variable to see when data is loaded and prepared for showing (binds with ng-if in html)
    $scope.dataReady = false;

    //create empty current selected topic object
    $scope.currentTopic = {
      label: "",
      volume: "/ ",
      sentiment: {
        positive: "/ ",
        neutral: "/ ",
        negative: "/ "
      }
    };

    //show info of selected topic
    $scope.showInfo = function (topic) {
      $scope.currentTopic = topic;
    };


    //set styles for topics in cloud (works with ng-style in html)
    $scope.setStyle = function (topic) {
      return {'color': topic.sentimentTextColor, 'font-size': topic.popularityTextSize, 'text-align': topic.randomAlignment};
    };

    //get topics JSON file via service and prepare for viewing
    Topics.getJSON('https://gist.githubusercontent.com/grahamscott/65b43572ad18c5fbdd87/raw/e259bbc254b2c00dca67bf2f6a7b98dd574c277c/topics.json').success(function (data) {
      $scope.topics = data.topics;
      console.log('loading data finished');
      $scope.preparedTopics = Topics.prepare($scope.topics);
      console.log('preparing data finished');
      $scope.dataReady = true;
    });
  });