angular.module("galleryService", ['ngResource'])
.factory('Gallery', ['$resource',
	function ($resource) {
		return $resource('http://endpoint.edmunds-media.com/api/v1/mmy/editorial/road-test-images/?make=ford&model=edge&year=2015&genericBodytype=suv&makeData=%7B%22name%22:%22Ford%22,%22niceName%22:%22ford%22%7D&modelData=%7B%22name%22:%22Edge%22,%22niceName%22:%22edge%22%7D&ps=NEW&style=%7B%22price%22:%7B%22baseMSRP%22:28100,%22baseInvoice%22:26484,%22deliveryCharges%22:895,%22estimateTmv%22:false%7D,%22id%22:200495941,%22name%22:%22SE+4dr+SUV+(2.0L+4cyl+Turbo+6A)%22,%22submodel%22:%7B%22body%22:%22SUV%22,%22modelName%22:%22Edge+SUV%22,%22niceName%22:%22suv%22%7D,%22trim%22:%22SE%22,%22mpg%22:%7B%22highway%22:%2230%22,%22city%22:%2220%22%7D,%22isDefault%22:true%7D', {}, {
			query: {
				method: 'GET',
				params: {

				}
			}
		});
	}]);