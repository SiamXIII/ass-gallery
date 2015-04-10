angular.module("ass-gallery")
.controller('galleryMainModuleCtrl', function ($scope, $http, Gallery, baseSettings) {
	//base Gallery url
	$scope.galleryUrl = baseSettings.galleryUrl();

	$scope.dataSource = Gallery.query(function () {
		$scope.setMainImage($scope.dataSource.response.photos[0]);
		$scope.selectedItemIndex = 0;
		$scope.selectedPhoto = $scope.dataSource.response.photos[0];

		$scope.setCarouselStyle({
			'left': $scope.lowerBound + 'px',
			'width': $scope.width / $scope.itemsInRow * $scope.dataSource.response.photos.length * 1.02 + "px"
		});
	});

	//initializes gallery styles and state
	$scope.init = function () {
		$scope.lowerBound = 0;
		$scope.isFullscreen = false;

		$scope.width = $scope.width < angular.element(document.getElementById('galleryWrapper'))[0].parentElement.parentElement.offsetWidth
			? $scope.width
			: angular.element(document.getElementById('galleryWrapper'))[0].parentElement.parentElement.offsetWidth;

		$scope.fullscreenButtonStyle = {
			'height': $scope.navigationHeight / 2 + 'px',
			'width': $scope.navigationHeight / 2 + 'px',
		}

		$scope.mainImageStyle = {
			'width': $scope.width + 'px',
		}
	}

	//shifts background sprite
	//style: style for which background should be shifted
	$scope.shiftBackground = function (style) {
		$scope[style]['background-position'] = -$scope.navigationHeight / 2 + 'px 0';
	}

	//shifts background sprite back
	//style: style for which background should be shifted back
	$scope.shiftBackgroundBack = function (style) {
		$scope[style]['background-position'] = '0 0';
	}

	//sets main image
	//item: image to set
	$scope.setMainImage = function (item) {
		$scope.mainImage = $scope.galleryUrl + item.photo;
		$scope.selectedPhoto = item;
		$scope.selectedItemIndex = $scope.dataSource.response.photos.indexOf(item);
		$scope.fullscreenImage = $scope.galleryUrl + item.fullscreen;
	}

	//toggles fullscreen
	$scope.toggleFullscreen = function () {
		$scope.isFullscreen
		? fullScreenCancel()
		: launchFullScreen(document.getElementById('mainImage'));
	}

	//launches element in fullscreen mode
	//element: element to dislay in fullscreen
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

	//cancels fullscreen
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