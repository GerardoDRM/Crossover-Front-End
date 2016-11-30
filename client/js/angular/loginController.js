crossOver.controller('loginController', function($scope, $route, $http, $compile, session, feedback) {
  // User object
  $scope.user = {};

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
      var user = response.data;
      // Validate credentials
      if (user.status == "error") {
        feedback.show("Bad authentication");
      } else {
        // Store session Id and user
        session.session = user.sessionId;
        session.username = user.username;
        feedback.show("Welcome " + user.username);
        setTimeout(function() {
          window.location.href = "?#/video_grid";
        }, 2000);
      }
    }, function errorCallback(response) {
      feedback.show("Bad authentication");
    });
  }
});
