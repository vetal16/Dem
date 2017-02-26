angular.module('EYE')
  .directive('imageObject', function() {
    return {
      restricted: 'A',
      link: function(scope, element, attrs) {
      	var ID = Date.now();
      	element.attr('id' , ID);

      	var nativeElement = document.getElementById(ID);
				// console.info(loadImage(nativeElement).getImageData(0, 0, 10, 10));

				function loadImage(image) {
				    var canvas = document.createElement("canvas");

				    canvas.width = image.width;
				    canvas.height = image.height;

				    var context = canvas.getContext("2d");
				    context.drawImage(image, 0, 0);
				    return context;
				};
      }
    };
  });
