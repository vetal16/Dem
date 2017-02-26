angular.module('EYE')
  .service('MatrixService', MatrixService);

function MatrixService() {

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
    for (var i=0;i<rows;i++) {
       arr[i] = [];
    }
    return arr;
  }
	return {
		createRandomMatrix: createRandomMatrix,
    walkThrough: walkThrough
	};
};
