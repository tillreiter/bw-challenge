'use strict';

angular.module('bwChallengeApp')

  .factory('Topics', ['$http', function ($http) {

    function setTextSize(volume, classSizePopularity) {
      var textSize = 12;
      var extraPopularitySize = Math.floor(volume / classSizePopularity) * 5;
      return (textSize + extraPopularitySize);
    }

    function setRandomAlignment() {
      var alignments = ['left', 'center', 'right'];
      var num = (Math.floor(Math.random() * 3));
      return alignments[num];
    }

    function setRandomColumnSize() {
      var comlumnSize = [3, 4];
      var num = (Math.floor(Math.random() * 2));
      return comlumnSize[num];
    }

    function setSentimentTextColor(topic) {
      var fontColor = null;
      if (topic.sentimentScore < 40) {
        fontColor = "#ff0124"; //red
      } else if (topic.sentimentScore > 60) {
        fontColor = "#33be2a";  //green
      } else {
        fontColor = "#696969"; //grey
      }
      return fontColor
    }

    var methods = {

      //http service to get JSON file, deferred success is accessed via main controller
      getJSON: function (path) {
        return $http.get(path);
      },

      //clean data of unneeded information and add styling information
      prepare: function (input) {
        var amountTopics = input.length,
          arr = [];

        //find most/least popular topic according to volume label
        var mostPopular = _.max(input, function (topics) {
          return topics.volume;
        });

        var leastPopular = _.min(input, function (topics) {
          return topics.volume;
        });

        //calculate range for sizing classes
        var classSizePopularity = (mostPopular.volume - leastPopular.volume) / 6;

        //read every topic
        for (var i = 0; i < amountTopics; i++) {
          var obj = {};

          //create new object only with key values for further processing
          obj = _.pick(input[i], 'label', 'volume', 'sentiment', 'sentimentScore');

          //add new values for viewing
          obj.popularityTextSize = setTextSize(input[i].volume, classSizePopularity);
          obj.randomAlignment = setRandomAlignment();
          obj.randomColumnSize = setRandomColumnSize();
          obj.sentimentTextColor = setSentimentTextColor(input[i]);

          //push to array that gets send back
          arr.push(obj);
        }

        //shuffle data for random positioning (biggest in the middle would also make sense - example looked shuffled)
        return _.shuffle(arr);
      }
    };

    return methods;

  }]);