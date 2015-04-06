angular.module("ass-gallery")
.controller('galleryMainModuleCtrl', function ($scope, $http, Gallery) {
	$scope.galleryUrl = 'http://services.edmunds-media.com/image-service/media-ed/ximm/?format=jpg:progressive&image=';

	$scope.lowerBound = 0;

	$scope.dataSource = Gallery.query(function () {
		$scope.setMainImage($scope.dataSource.response.photos[0]);
		$scope.selectedPhoto = $scope.dataSource.response.photos[0];
		$scope.itemsListStyle.width = $scope.width / 5 * $scope.dataSource.response.photos.length + "px";
	});

	$scope.init = function () {
		$scope.navigationHeight = $scope.width / 8;

		$scope.fullscreenButtonStyle = {
			'height': $scope.navigationHeight / 2 + 'px',
			'width': $scope.navigationHeight / 2 + 'px',
		}

		$scope.navigationContainerStyle = {
			'height': $scope.navigationHeight + 'px',
			'width': $scope.width + 'px'
		}

		$scope.listItemStyle = {
			'width': $scope.width * 0.19 + 'px',
			'margin-right': $scope.width * 0.0125 + "px"
		}

		$scope.itemsListStyle = {
			'height': $scope.navigationHeight + 'px',
			'left': $scope.lowerBound + 'px'
		}

		$scope.leftArrowStyle = {
			'height': $scope.navigationHeight / 2 + 'px',
			'width': $scope.navigationHeight / 2 + 'px',
			'top': $scope.navigationHeight / 4 + 'px'
		}

		$scope.rightArrowStyle = {
			'height': $scope.navigationHeight / 2 + 'px',
			'width': $scope.navigationHeight / 2 + 'px',
			'top': $scope.navigationHeight / 4 + 'px'
		}

		$scope.mainImageStyle = {
			'width': $scope.width + 'px',
		}
	}

	$scope.shiftBackground = function (style) {
		$scope[style]['background-position'] = -$scope.navigationHeight / 2 + 'px 0';
	}

	$scope.shiftBackgroundBack = function (style) {
		$scope[style]['background-position'] = '0 0';
	}

	$scope.setMainImage = function (item) {
		$scope.mainImage = $scope.galleryUrl + item.photo;
		$scope.selectedPhoto = item;
		$scope.fullscreenImage = $scope.galleryUrl + item.fullscreen;
	}

	$scope.nextPage = function () {
		$scope.lowerBound -= +$scope.width + $scope.width * 0.0125;
		$scope.itemsListStyle.left = $scope.lowerBound + 'px';
	}

	$scope.previousPage = function () {
		$scope.lowerBound += +$scope.width + $scope.width * 0.0125;
		$scope.itemsListStyle.left = $scope.lowerBound + 'px';
	}

	$scope.openFullscreen = function () {
		launchFullScreen(document.getElementById('mainImage'));
	}

	$scope.showLeftArrow = function () {
		return $scope.lowerBound < 0;
	}

	$scope.showRightArrow = function () {
		return $scope.lowerBound > -($scope.width / 5 * $scope.dataSource.response.photos.length - $scope.width);
	}

	function launchFullScreen(element) {
		if (element.requestFullScreen) {
			element.requestFullScreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen();
		}
	}
})