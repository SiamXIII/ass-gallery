angular.module("ass-gallery")
.controller('galleryMainModuleCtrl', function ($scope, $http, Gallery) {
	$scope.galleryUrl = 'http://services.edmunds-media.com/image-service/media-ed/ximm/?format=jpg:progressive&image=';

	$scope.dataSource = Gallery.query(function () {
		$scope.setMainImage($scope.dataSource.response.photos[0]);
		$scope.selectedItemIndex = 0;
		$scope.selectedPhoto = $scope.dataSource.response.photos[0];
		$scope.itemsListStyle.width = $scope.width / 5 * $scope.dataSource.response.photos.length * 1.02 + "px";
	});

	$scope.init = function () {
		$scope.lowerBound = 0;
		$scope.isFullscreen = false;

		$scope.width = $scope.width < angular.element(document.getElementById('galleryWrapper'))[0].parentElement.parentElement.offsetWidth
			? $scope.width
			: angular.element(document.getElementById('galleryWrapper'))[0].parentElement.parentElement.offsetWidth;

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

	$scope.toggleFullscreen = function () {
		$scope.isFullscreen
		? fullScreenCancel()
		: launchFullScreen(document.getElementById('mainImage'));
	}

	$scope.isBeginning = function () {
		return $scope.lowerBound >= 0;
	}

	$scope.isEnd = function () {
		return $scope.dataSource.response &&
			$scope.lowerBound <= -($scope.width / 5 * $scope.dataSource.response.photos.length - $scope.width);
	}

	$scope.isSelected = function (el) {
		return el == $scope.selectedPhoto;
	}

	function launchFullScreen(element) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}

		$scope.isFullscreen = true;
	}

	function fullScreenCancel() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}

		$scope.isFullscreen = false;
	}
})