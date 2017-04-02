angular.module('EYE')
  .service('MatrixService', MatrixService);

function MatrixService() {

  function clean(array) {
    var cleanArray = [];
    for (i = 0; i < array.length; i += 4)
      cleanArray.push(array[i]);
    return cleanArray;
  }

  function walkThrough(matrix, callback) {
    var m = matrix[0].length,
        n = matrix.length;

    for (var i = 0; i < m; i++)
      for (var j = 0; j < n; j++)
        callback(i, j, matrix[i][j]);
  }

	function createRandomMatrix(m, n) {
		var matrix = create2DArray(n);

		for (var i = 0; i < m; i++)
			for (var j = 0; j < n; j++)
				matrix[i][j] = Math.random(10);

    return matrix;
	}


  function create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
       arr[i] = [];
    }
    return arr;
  }

  function findMax(matrix) {
    var maxElement = matrix[0][0];

    this.walkThrough(matrix, function(i, j, element) {
      if (element.value > maxElement.value)
        maxElement = Object.assign({}, element);
    });

    return maxElement;
  }
	return {
    clean: clean,
		createRandomMatrix: createRandomMatrix,
    walkThrough: walkThrough,
    create2DArray: create2DArray,
    findMax: findMax
	};
};
