angular.module('EYE')
  .service('MatrixService', MatrixService);

function MatrixService() {

  function longTo2DArray(width, height, array) {
    var i = 0,
        j = 0,
        l = 0,
        matrix = Create2DArray(height);

    while (l < array.data.length) {
      matrix[i][j] = array.data[l];

      l += 4;

      i++;
      if (i === width) {
        j++;
        i = 0;
      }
    }

    return matrix;
  }

  function walkThrough(matrix, callback) {
    var m = matrix[0].length,
        n = matrix.length;

    for (var i = 0; i < m; i++)
      for (var j = 0; j < n; j++)
        callback(i, j, matrix[i][j]);
  }

	function createRandomMatrix(m, n) {
		var matrix = Create2DArray(n);

		for (var i = 0; i < m; i++)
			for (var j = 0; j < n; j++)
				matrix[i][j] = Math.random(10);

    return matrix;
	}


  function Create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
       arr[i] = [];
    }
    return arr;
  }
	return {
    longTo2DArray: longTo2DArray,
		createRandomMatrix: createRandomMatrix,
    walkThrough: walkThrough
	};
};
