angular.module('EYE')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['MatrixService', 'CanvasService', 'ConfigService', '$timeout'];

function MainCtrl(MatrixService, CanvasService, ConfigService, $timeout) {
  var vm = this;

  vm.K = ConfigService.K;
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
			MatrixService.walkThrough(matrix, function(x, y, element) {
		  	CanvasService.drawRect(x, y, element.value);
			});

			var maxElement = MatrixService.findMax(matrix);
			CanvasService.encloseCell(maxElement.i, maxElement.j);

			console.log('Max', maxElement);
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

		console.log('***');
		console.log('imageWidth', imageWidth);
		console.log('imageHeight', imageHeight);
		console.log('patternWidth', patternWidth);
		console.log('patternHeight', patternHeight);
		console.log('iMax', iMax);
		console.log('jMax', jMax);
		console.log('***');

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
				matrix[k][l] = {
					x0: i,
					y0: j,
					i: k,
					j: l,
					deltaX: patternWidth,
					deltaY: patternHeight,
					value: ss.sampleCorrelation(
						MatrixService.clean(image.getImageData(i, j, patternWidth, patternHeight).data),
						MatrixService.clean(pattern.getImageData(0, 0, patternWidth, patternHeight).data))
				};

				/*console.log('---');
				console.log('x', i, 'x+', i + patternWidth);
				console.log('y', j, 'y+', j + patternHeight);
				console.log('correlation', matrix[k][l]);*/
			}, 0);
		}

		matrix.length = l;
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
