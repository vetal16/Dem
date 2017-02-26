angular.module('EYE')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['MatrixService', 'CanvasService'];

function MainCtrl(MatrixService, CanvasService) {
  // console.info(ss.sampleCorrelation([1, 2, 3, 4, 5, 6], [2, 2, 3, 4, 5, 60]).toFixed(2));
  /*var dim = 50,
  		matrix = MatrixService.createRandomMatrix(dim, dim);

  console.info('matrix', matrix);

  // CanvasService.drawGrid(dim, dim);
  CanvasService.drawBorder(dim, dim);

  MatrixService.walkThrough(matrix, function(x, y, value) {
  	CanvasService.drawRect(x, y, value);
  });*/

  var vm = this;

  vm.loadImage = loadImage;

  function loadImage(name, imageData, width, height) {
  	console.info(MatrixService.longTo2DArray(width, height, imageData.getImageData(0, 0, width, height)));
  }
};
