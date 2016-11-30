crossOver.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/main.html',
        controller: 'loginController'
      }).
      when('/video_grid/', {
        templateUrl: 'views/videos.html',
        controller: 'videoController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
