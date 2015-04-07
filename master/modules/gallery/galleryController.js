angular.module("ass-gallery")
.controller('galleryMainModuleCtrl', function ($scope, $http, Gallery) {
	$scope.galleryUrl = 'http://services.edmunds-media.com/image-service/media-ed/ximm/?format=jpg:progressive&image=';

	$scope.lowerBound = 0;

	$scope.dataSource = Gallery.query(function () {
		$scope.setMainImage($scope.dataSource.response.photos[0]);
		$scope.selectedItemIndex = 0;
		$scope.selectedPhoto = $scope.dataSource.response.photos[0];
		$scope.itemsListStyle.width = $scope.width / 5 * $scope.dataSource.response.photos.length + 100 + "px";
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
		$scope.selectedItemIndex = $scope.dataSource.response.photos.indexOf(item);
		$scope.fullscreenImage = $scope.galleryUrl + item.fullscreen;
	}

	$scope.nextPage = function () {
		if (!$scope.isEnd()) {
			$scope.lowerBound -= +$scope.width + $scope.width * 0.0125;
			$scope.itemsListStyle.left = $scope.lowerBound + 'px';
		}
	}

	$scope.previousPage = function () {
		if (!$scope.isBeginning()) {
			$scope.lowerBound += +$scope.width + $scope.width * 0.0125;
			$scope.itemsListStyle.left = $scope.lowerBound + 'px';
		}
	}

	$scope.openFullscreen = function () {
		launchFullScreen(document.getElementById('mainImage'));
	}

	$scope.isBeginning = function () {
		return $scope.lowerBound >= 0;
	}

	$scope.isEnd = function () {
		return $scope.dataSource.response.photos &&
			$scope.lowerBound <= -($scope.width / 5 * $scope.dataSource.response.photos.length - $scope.width);
	}

	$scope.isSelected = function (el) {
		return el == $scope.selectedPhoto;
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