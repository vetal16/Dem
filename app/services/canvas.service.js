angular.module('EYE')
  .service('CanvasService', CanvasService);

CanvasService.$inject = ['ConfigService'];

function CanvasService(ConfigService) {
  var CONTEXT = init('canvas-anchor', 900, 630),
      CANVAS,
      cellWidth = ConfigService.cellWidth;
      
      CONTEXT.lineWidth = ConfigService.lineWidth;
      // CONTEXT.translate(0.5, 0.5);

  function init(anchorId, m, n) {
    var canvas = document.createElement("canvas");
    document.getElementById(anchorId).appendChild(canvas);

    canvas.width = m;
    canvas.height = n;

    CANVAS = canvas;

    return canvas.getContext("2d");
  }

  function drawRect(x, y, value) {
    var lineWidth = CONTEXT.lineWidth;

    CONTEXT.fillStyle = getColor(value);
    CONTEXT.fillRect(
      (x + 1) * cellWidth + lineWidth, 
      (y + 1) * cellWidth + lineWidth, 
      cellWidth - 2 * lineWidth, 
      cellWidth - 2 * lineWidth);
  }

  function encloseCell(x, y) {
    console.error(x, y);
    var lineWidth = CONTEXT.lineWidth;

    CONTEXT.strokeStyle = '#0F0';
    CONTEXT.beginPath();
    CONTEXT.rect(
      (x + 1) * cellWidth, 
      (y + 1) * cellWidth, 
      cellWidth, 
      cellWidth);
    CONTEXT.stroke();
  }

  function drawGrid(m, n) {
    for (var i = 1; i <= n + 1; i++)
      drawLine(cellWidth, i * cellWidth, (n + 1) * cellWidth, i * cellWidth);

    for (var i = 1; i <= m + 1; i++)
      drawLine(i * cellWidth, cellWidth, i * cellWidth, (m + 1) * cellWidth);
  }

  function drawBorder(m, n) {
    CONTEXT.strokeStyle = ConfigService.borderColor;
    CONTEXT.beginPath();
    CONTEXT.rect(cellWidth, cellWidth, m * cellWidth, n * cellWidth);
    CONTEXT.stroke();
  }

  function getColor(value) {
    var color = Math.trunc(256 * value);
    return 'rgb(' + color + ', ' + color + ', ' + color + ')';
  }

  function drawLine(x1, y1, x2, y2) {
    CONTEXT.strokeStyle = ConfigService.gridColor;
    CONTEXT.beginPath();
    CONTEXT.moveTo(x1, y1);
    CONTEXT.lineTo(x2, y2);
    CONTEXT.stroke();
  }

  function clean() {
    console.info('clean');
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
  }

	return {
    drawBorder: drawBorder,
    drawGrid: drawGrid,
    drawRect: drawRect,
    encloseCell: encloseCell,
    clean: clean
	};
};
