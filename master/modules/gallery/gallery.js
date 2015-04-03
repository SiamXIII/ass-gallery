angular.module("ass-gallery", ['ngResource', 'galleryService'])
.directive("galleryMainModule", function () {
	return {
		restrict: "E",
		templateUrl: "/modules/gallery/gallery.html",
		scope: {
			dataSourceUrl: '=',
			width: '@',
			height: '@',
		},
		controller: 'galleryMainModuleCtrl'
	}
});