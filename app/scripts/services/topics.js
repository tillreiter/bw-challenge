'use strict';

angular.module('bwChallengeApp')

  //set up factory that provides controller with topics json data
  .factory('topics', function ($http) {

    var obj = {content: null};

    $http.get('./content/topics.json').success(function (data) {
      // filter out stuff we do not need
      obj.content = data;
    });

    return obj;
  });

