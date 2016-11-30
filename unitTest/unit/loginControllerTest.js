crossOverTest.controller('loginControllerTest', function($scope, $http) {
  // User object
  $scope.user = {};
  $scope.status = undefined;
  $scope.session = undefined;

  // This function request session Id to server and authenticate user
  $scope.login = function() {
    // MD5 encryption on password
    var hash = CryptoJS.MD5($scope.user.password);
    $http({
      method: 'POST',
      url: 'http://localhost:3000/user/auth',
      data: {
        "username": $scope.user.name,
        "password": hash.toString(CryptoJS.enc.Base64)
      }
    }).then(function successCallback(response) {
      $scope.status = response.data.data.status;
    }, function errorCallback(response) {
      $scope.status = "error";
    });
  }

  // This fucnton logout user session
  $scope.logout = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/user/logout',
      params: {
        "sessionId": $scope.session
      }
    }).then(function successCallback(response) {
      $scope.status = response.data.data.status;
    }, function errorCallback(response) {
      $scope.status = "error";
    });
  }
});
