angular.module("ass-gallery")
.controller('galleryMainModuleCtrl', function ($scope, $http, Gallery) {
	$scope.galleryUrl = 'http://services.edmunds-media.com/image-service/media-ed/ximm/?format=jpg:progressive&image=';

	$scope.lowerBound = 0;
	$scope.upperBound = 4;

	$scope.dataSource = Gallery.query(function () {
		$scope.setMainImage($scope.dataSource.response.photos[0]);
		$scope.selectedPhoto = $scope.dataSource.response.photos[0];
	});

	$scope.fullscreenButtonStyle = {
		'height': $scope.height / 2 + 'px',
		'width': $scope.height / 2 + 'px',
	}

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

	$scope.shiftBackground = function (style) {
		$scope[style]['background-position'] = -$scope.height / 2 + 1 + 'px 0';
	}

	$scope.shiftBackgroundBack = function (style) {
		$scope[style]['background-position'] = '0 0';
	}

	$scope.setMainImage = function (item) {
		$scope.mainImage = $scope.galleryUrl + item.photo;
		$scope.selectedPhoto = item;
	}

	$scope.nextPage = function () {
		$scope.lowerBound += 5;
		$scope.upperBound += 5;
	}

	$scope.previousPage = function () {
		$scope.lowerBound -= 5;
		$scope.upperBound -= 5;
	}

	$scope.openFullscreen = function () {
		$scope.fullscreenStyle = {
			'visibility': 'visible',
			'opacity': '1',
			'transition-delay': '0s'
		}

		$scope.fullscreenImage = $scope.galleryUrl + $scope.selectedPhoto.fullscreen;
	}

	$scope.hideFullscreen = function () {
		$scope.fullscreenStyle = {
			'visibility': 'hidden',
			'opacity': '0',
		}
	}
})