angular.module('EYE')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['MatrixService', 'CanvasService', '$timeout'];

function MainCtrl(MatrixService, CanvasService, $timeout) {
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

  vm.K = 2;
  vm.data = {
  	image: {},
  	pattern: {}
  };

  vm.loadImage = loadImage;
  vm.recognize = recognize;

	console.info(vm.data);

	function recognize() {
		var matrix = buildCorrelationMatrix(
		vm.data.image.width,
		vm.data.image.height,
		vm.data.pattern.width,
		vm.data.pattern.height);

		console.info(matrix);

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

		console.info(iMax, jMax);

		/*while (j <= jMax) {
			while (i <= iMax) {
					loop(i, j, k, l);

					i = i + patternWidth / 2;
					k++;
			}
			j = j + patternHeight / 2;
			k = 0;
			l++;
		}*/

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
				// console.info(i, j);
				// console.info(k, l);
				/*console.info('i', i, 'j', j, 'ss', correlation(
				image.getImageData(i, j, patternWidth, patternHeight).data,
				pattern.getImageData(0, 0, patternWidth, patternHeight).data));*/

				matrix[k][l] = ss.sampleCorrelation(
					MatrixService.clean(image.getImageData(i, j, patternWidth, patternHeight).data),
					MatrixService.clean(pattern.getImageData(0, 0, patternWidth, patternHeight).data))	
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
