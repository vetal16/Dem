angular.module('EYE')
  .service('ConfigService', ConfigService);


function ConfigService() {
	return {
		cellWidth: 15,
		lineWidth: 1,
		borderColor: '#F00',
		gridColor: '#000'
	};
}