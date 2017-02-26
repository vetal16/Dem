angular.module('EYE')
  .controller('MainCtrl', function() {
    console.info(ss.sampleCorrelation([1, 2, 3, 4, 5, 6], [2, 2, 3, 4, 5, 60]).toFixed(2));
  });
