//'use strict';

angular.module('bwChallengeApp')

  .factory('Topics', ['$http', function ($http) {

  function setTextSize(volume, classSizePopularity) {
    return Math.floor(volume / classSizePopularity)
  }

  function setRandomAlignment() {
    var alignment = ['left', 'center', 'right'];
    var num = (Math.floor(Math.random() * 3));
    return alignment[num];
  }

  function setRandomColumnSize() {
    var column = [3, 4];
    var num = (Math.floor(Math.random() * 2));
    return column[num];
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

    getJSON: function () {
      return $http.get('./content/topics.json');
    },

    prepare: function (input) {
      var amountTopics = input.length,
        arr = [];

//    find most/least popular topic and calculate range for text sizes
      var mostPopular = _.max(input, function (topics) {
        return topics.volume;
      });

      var leastPopular = _.min(input, function (topics) {
        return topics.volume;
      });

      var classSizePopularity = (mostPopular.volume - leastPopular.volume) / 6;


//    filter out keys for further processing
      for (var i = 0; i < amountTopics; i++) {
        var obj = {};
        obj = _.pick(input[i], 'label', 'volume', 'sentiment', 'sentimentScore');
        obj.relativeTextSize = setTextSize(input[i].volume, classSizePopularity);
        obj.randomAlignment = setRandomAlignment();
        obj.randomColumnSize = setRandomColumnSize();
        obj.sentimentTextColor = setSentimentTextColor(input[i]);

        arr.push(obj);
      }

//    shuffle data for random positioning (biggest in the middle would also make sense - example looked shuffled)
      return _.shuffle(arr);
    }
  };

  return methods;

  }]);
