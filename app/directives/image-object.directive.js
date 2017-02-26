angular.module('EYE')
  .directive('imageObject', function() {
    return {
      restricted: 'A',
      scope: {
        name: '=',
        callback: '&'
      },
      link: function(scope, element, attrs) {
      	var ID = Date.now();
      	element.attr('id' , ID);

      	var nativeElement = document.getElementById(ID);

        element.ready(function () {
          scope.callback({
            name: scope.name, 
            imageData: loadImage(nativeElement),
            width: element[0].offsetWidth,
            height: element[0].offsetHeight
          });
        });

				function loadImage(image) {
				    var canvas = document.createElement("canvas");
				    var context = canvas.getContext("2d");
				    context.drawImage(image, 0, 0);
				    return context;
				};
      }
    };
  });
