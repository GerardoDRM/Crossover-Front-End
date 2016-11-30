var crossOverTest = angular.module('crossoverApp', []);

// Test Code user login and logout
describe('user', function() {
  var $controller;
  var $httpBackend;
  var $scope;

  beforeEach(module('crossoverApp'));

  beforeEach(inject(function(_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $scope = {};
    $httpBackend = _$httpBackend_;
  }));

  describe('login http test', function() {
    it('POST Username + MD5(password) = should login, user/auth', function() {
      $controller('loginControllerTest', {
        $scope: $scope
      });

      $scope.user.password = "password";
      $scope.user.name = "ali";
      var md5Password = CryptoJS.MD5($scope.user.password).toString(CryptoJS.enc.Base64)

      $httpBackend
        .when('POST', 'http://localhost:3000/user/auth', {
          "username": $scope.user.name,
          "password": md5Password
        })
        .respond(200, {
          data: {
            "status": "success"
          }
        });

      $httpBackend.expect('POST', 'http://localhost:3000/user/auth', {
        "username": $scope.user.name,
        "password": md5Password
      });

      $scope.login();

      $httpBackend.flush();
      expect($scope.status).toEqual("success");
    });
  });

  describe('logout http test', function() {
    it('GET sessionId, /user/logout', function() {
      $controller('loginControllerTest', {
        $scope: $scope
      });

      $scope.session = "session";

      $httpBackend
        .when('GET', 'http://localhost:3000/user/logout?sessionId=session')
        .respond(200, {
          data: {
            "status": "success"
          }
        });

      $httpBackend.expect('GET', 'http://localhost:3000/user/logout?sessionId=session');

      $scope.logout();

      $httpBackend.flush();
      expect($scope.status).toEqual("success");
    });
  });
});

// Test code videos
describe('videos', function() {
  var $controller;
  var $httpBackend;
  var $scope;

  beforeEach(module('crossoverApp'));

  beforeEach(inject(function(_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $scope = {};
    $httpBackend = _$httpBackend_;
  }));

  describe('videos http test', function() {
    // Get videos request test
    it('GET videos /videos', function() {
      $controller('videoControllerTest', {
        $scope: $scope
      });

      $scope.session = "session";
      $httpBackend
        .when('GET', 'http://localhost:3000/videos?limit=10&sessionId=session&skip=1')
        .respond(200, {
          data: {
            "status": "success"
          }
        });

      $httpBackend.expect('GET', 'http://localhost:3000/videos?limit=10&sessionId=session&skip=1');

      $scope.getVideos();

      $httpBackend.flush();
      expect($scope.status).toEqual("success");
    });

    // Get video detail test
    it('GET video details /video', function() {
      $controller('videoControllerTest', {
        $scope: $scope
      });

      $scope.session = "session";
      $scope.video._id = "video";
      $httpBackend
        .when('GET', 'http://localhost:3000/video?sessionId=session&videoId=video')
        .respond(200, {
          data: {
            "status": "success"
          }
        });

      $httpBackend.expect('GET', 'http://localhost:3000/video?sessionId=session&videoId=video');

      $scope.getVideoDetails();

      $httpBackend.flush();
      expect($scope.status).toEqual("success");
    });

    // Add grade to video test
    it('POST videoId,rating /video/ratings?sessionId=', function() {
      $controller('videoControllerTest', {
        $scope: $scope
      });

      $scope.session = "session";
      $scope.video._id = "id";
      $scope.video.grade = "5";
      $httpBackend
        .when('POST', 'http://localhost:3000/video/ratings?sessionId=session', {
          "videoId": $scope.video._id,
          "rating": $scope.video.grade
        })
        .respond(200, {
          data: {
            "status": "success"
          }
        });

      $httpBackend.expect('POST', 'http://localhost:3000/video/ratings?sessionId=session', {
        "videoId": $scope.video._id,
        "rating": $scope.video.grade
      });

      $scope.addGrade();

      $httpBackend.flush();
      expect($scope.status).toEqual("success");
    });
  });
});
