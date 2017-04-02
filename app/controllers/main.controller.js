angular.module('EYE')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['MatrixService', 'CanvasService', '$timeout'];

function MainCtrl(MatrixService, CanvasService, $timeout) {
  var vm = this;

  vm.K = 2;
  vm.data = {
  	image: {},
  	pattern: {}
  };

  vm.loadImage = loadImage;
  vm.recognize = recognize;

	function recognize() {
		var matrix = buildCorrelationMatrix(
		vm.data.image.width,
		vm.data.image.height,
		vm.data.pattern.width,
		vm.data.pattern.height);

		console.info('matrix', matrix);

		$timeout(function() {
			CanvasService.clean();
			CanvasService.drawBorder(matrix.length, matrix.length);
			MatrixService.walkThrough(matrix, function(x, y, value) {
		  	CanvasService.drawRect(x, y, value);
		  });
	  }, 1000);
	}
	
	function buildCorrelationMatrix(imageWidth, imageHeight, patternWidth, patternHeight) {
		var image = vm.data.image.imageData,
				pattern = vm.data.pattern.imageData,
				i = 0,
				iMax = patternWidth * (Math.trunc(imageWidth / patternWidth) - 1)
				j = 0,
				jMax = patternHeight * (Math.trunc(imageHeight / patternHeight) - 1),
				matrix = MatrixService.create2DArray(Math.trunc(vm.K * imageHeight / patternHeight) - 1),
				k = 0,
				l = 0;

		for (j = 0; j <= jMax; j = j + Math.trunc(patternHeight / vm.K)) {	
			for (i = 0; i <= iMax; i = i + Math.trunc(patternWidth / vm.K)) {
				loop(i, j, k, l);
				k++;
			}
			k = 0;
			l++;
		}

		function loop(i, j, k, l) {
			$timeout(function() {
				matrix[k][l] = ss.sampleCorrelation(
					MatrixService.clean(image.getImageData(i, j, patternWidth, patternHeight).data),
					MatrixService.clean(pattern.getImageData(0, 0, patternWidth, patternHeight).data));
			}, 1);
		}

		return matrix;
	}

  function loadImage(name, imageData, width, height) {
  	vm.data[name] = {
  		name: name,
  		width: width,
  		height: height,
  		imageData: imageData
  	};
  }
};
