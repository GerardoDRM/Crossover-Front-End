crossOverTest.controller('videoControllerTest', function($scope, $http, $compile) {
  $scope.video = {};
  $scope.session = undefined;
  $scope.status = undefined;
  // This fucntion gets videos list
  $scope.getVideos = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/videos',
      params: {
        "sessionId": $scope.session,
        "skip": 1,
        "limit": 10
      }
    }).then(function successCallback(response) {
      $scope.status = response.data.data.status;

    }, function errorCallback(response) {
      $scope.status = "error";
    });
  }

  // Video Details
  // This function display a video detail
  $scope.getVideoDetails = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/video',
      params: {
        "sessionId": $scope.session,
        "videoId": $scope.video._id
      }
    }).then(function successCallback(response) {
      console.log(response);
      $scope.status = response.data.data.status;

    }, function errorCallback(response) {
      $scope.status = "error";
    });
  }

  // Add grade
  $scope.addGrade = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/video/ratings?sessionId=' + $scope.session,
      data: {
        "videoId": $scope.video._id,
        "rating": $scope.video.grade
      }
    }).then(function successCallback(response) {
      $scope.status = response.data.data.status;
    }, function errorCallback(response) {
      $scope.status = "error";
    });
  }



});
