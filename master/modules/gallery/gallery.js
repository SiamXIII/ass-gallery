angular.module("ass-gallery", ['ngResource', 'galleryService'])
.directive("galleryMainModule", function () {
	return {
		restrict: "E",
		templateUrl: "/modules/gallery/gallery.html",
		scope: {
			dataSourceUrl: '='
		},
		controller: function ($scope, $http, Gallery) {
			$scope.galleryUrl = 'http://services.edmunds-media.com/image-service/media-ed/ximm/?format=jpg:progressive&image=';

			$scope.dataSource = Gallery.query();

			$scope.arrowStyle = {
				'height': '60px',
				'width': '60px'
		}
	}
}
});