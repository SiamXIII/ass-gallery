angular.module("ass-gallery", ['ngResource', 'galleryService','ngTouch'])
.directive("galleryMainModule", function () {
	return {
		restrict: "E",
		templateUrl: "/modules/gallery/gallery.html",
		scope: {
			dataSourceUrl: '=',
			width: '@'
		},
		controller: 'galleryMainModuleCtrl'
	}
})
.directive('loading', function () {
	return {
		link: function (scope, element, attrs) {
			element.bind("load", function (e) {
				this.className += ' loaded';
			});
		}
	}
});;