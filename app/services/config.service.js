angular.module('EYE')
  .service('ConfigService', ConfigService);


function ConfigService() {
	return {
		cellWidth: 40,
		lineWidth: 1,
		borderColor: '#F00',
		gridColor: '#000'
	};
}