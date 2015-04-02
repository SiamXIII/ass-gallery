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

			$scope.lowerBound = 0;
			$scope.upperBound = 4;

			$scope.dataSource = Gallery.query(function () {
				$scope.setMainImage($scope.dataSource.response.photos[0].photo);
			});

			$scope.navigationStyle = {
				'height': $scope.height + 'px',
				'width': $scope.width + 'px'
			}

			$scope.leftArrowStyle = {
				'height': $scope.height / 2 + 'px',
				'width': $scope.height / 2 + 'px',
				'margin-top': $scope.height / 4 + 'px'
			}

			$scope.rightArrowStyle = {
				'height': $scope.height / 2 + 'px',
				'width': $scope.height / 2 + 'px',
				'margin-top': $scope.height / 4 + 'px'
			}

			$scope.mainImageStyle = {
				'width': $scope.width + 'px',
			}

			$scope.shiftBackground = function (arrow) {
				$scope[arrow]['background-position'] = -$scope.height / 2 + 1 + 'px 0';
			}

			$scope.shiftBackgroundBack = function (arrow) {
				$scope[arrow]['background-position'] = '0 0';
			}

			$scope.setMainImage = function (photo) {
				$scope.mainImage = $scope.galleryUrl + photo;
			}

			$scope.nextPage = function () {
				$scope.lowerBound += 5;
				$scope.upperBound += 5;
			}

			$scope.previousPage = function () {
				$scope.lowerBound -= 5;
				$scope.upperBound -= 5;
			}
		}
	}
});