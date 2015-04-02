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
		controller: function ($scope, $http, Gallery) {
			$scope.galleryUrl = 'http://services.edmunds-media.com/image-service/media-ed/ximm/?format=jpg:progressive&image=';

			$scope.dataSource = Gallery.query();

			$scope.navigationStyle = {
				'height': $scope.height + 'px',
				'width': $scope.width + 'px'
			}

			$scope.leftArrowStyle = {
				'height': $scope.height + 'px',
				'width': $scope.height + 'px'
			}

			$scope.rightArrowStyle = {
				'height': $scope.height + 'px',
				'width': $scope.height + 'px'
			}

			$scope.shiftBackground = function (arrow) {
				$scope[arrow]['background-position'] = -$scope.height + 'px 0';
			}

			$scope.shiftBackgroundBack = function (arrow) {
				$scope[arrow]['background-position'] = '0 0';
			}
		}
	}
});