crossOver.controller('videoController', function($scope, $route, $http, $compile, session, feedback, dialog) {
  var skipCounter = 1
  var currentVideo = false;
  var elementVideo = undefined;
  var scrollBottom = false;
  var dialogContainer;
  $scope.video = {};
  // This fucntion gets videos list
  var __getVideos = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/videos',
      params: {
        "sessionId": session.session,
        "skip": skipCounter,
        "limit": 10
      }
    }).then(function successCallback(response) {
      var videos = response.data.data;
      // Create elements on DOM
      for (var i = 0; i < videos.length; i++) {
        __addVideoOnGrid(videos[i]);
      }
      // Refresh DOM to detect MDL Waterfall
      componentHandler.upgradeDom();
      // Get all video elements and add an event listener
      var videos = document.getElementsByTagName('video');
      for (var i = 0; i < videos.length; i++) {
        videos[i].addEventListener('playing', function() {
          // Check if another video is playing
          // A video at once
          // Pause all videos
          for (var j = 0; j < videos.length; j++) {
            if (videos[j] != this) {
              videos[j].pause();
            }
          }
          // Play current video
          this.play();
        });
      }
      // skip
      skipCounter++;
      // reset scroll
      scrollBottom = false;
    }, function errorCallback(response) {
      feedback.show("Bad Request, try again");
    });
  }

  var init = function() {
    // Check if session
    if (session.session === undefined) {
      window.location.href = "/?#/";
    }
    // Call Videos
    __getVideos();
    // Detect scroll to bottom
    var mainLayout = document.querySelector("main");
    mainLayout.onscroll = function(ev) {
      if ((mainLayout.scrollHeight - mainLayout.scrollTop) == mainLayout.offsetHeight && !scrollBottom) {
        scrollBottom = true;
        __getVideos();
      }
    };

    // Create Dialog Details
    dialogContainer = dialog.create();
  }

  // Init process
  init();

  // This fucntion append card element on DOM
  var __addVideoOnGrid = function(video) {
    var raitings = video.ratings;
    var grade = 0;
    // Get raiting
    for (var i = 0; i < raitings.length; i++) {
      grade += raitings[i];
    }
    grade = Math.round(grade / raitings.length);
    // Generate raiting elements
    var raitingElem = '<div>';
    for (var i = 0; i < 5; i++) {
      if (i < grade) {
        raitingElem += '<i class="material-icons red">favorite</i>';
      } else {
        raitingElem += '<i class="material-icons">favorite</i>';
      }
    }
    raitingElem += '</div>'

    var videoUrl = "http://localhost:3000/" + video.url;
    angular.element(document.getElementById('videos-container')).append($compile(
      '<div class="mdl-cell mdl-cell--4-col">' +
      '<div class="mdl-card mdl-shadow--4dp video-card">' +
      '<div class="mdl-card__title">' +
      '<h2 class="mdl-card__title-text">' +
      '<a href="javascript:void(0)" ng-click="openDialog(\'' + video._id + '\')">' + video.name + '</a></h2>' +
      '</div>' +
      '<div class="mdl-card__media">' +
      '<video width="100%" controls>' +
      '<source src="' + videoUrl + '" type="video/mp4">' +
      '</video>' +
      '</div>' +
      '<div class="mdl-card__supporting-text">' +
      raitingElem +
      '<p>' + video.description + '</p></div>' +
      '<div class="mdl-card__menu">' +
      '</div>' +
      '</div></div>'
    )($scope));
  }

  // Video Details
  // This function display a video detail
  $scope.openDialog = function(videoId) {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/video',
      params: {
        "sessionId": session.session,
        "videoId": videoId
      }
    }).then(function successCallback(response) {
      dialogContainer.show();
      var videoData = response.data;
      if (videoData.status == "success") {
        $scope.video = videoData.data;
        // Load video
        var videoDetail = document.querySelector('#video');
        videoDetail.src = "http://localhost:3000/" + $scope.video.url;
        videoDetail.load();
        videoDetail.play();
        // Load raiting
        var ratings = $scope.video.ratings;
        // Get raiting
        $scope.video.rating = 0;
        for (var i = 0; i < ratings.length; i++) {
          $scope.video.rating += ratings[i];
        }
        $scope.video.rating = ($scope.video.rating / ratings.length).toFixed(1);
      } else {
        feedback.show("Bad Request, try again");
      }
    }, function errorCallback(response) {
      feedback.show("Bad Request, try again");
    });
  }

  // Add grade
  $scope.addGrade = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/video/ratings?sessionId=' + session.session,
      data: {
        "videoId": $scope.video._id,
        "rating": $scope.grade.toString()
      }
    }).then(function successCallback(response) {
      var data = response.data;
      if (data.status == "success") {
        feedback.show("You rated this video");
        // Load raiting
        var ratings = data.data.ratings;
        // Get raiting
        $scope.video.rating = 0;
        for (var i = 0; i < ratings.length; i++) {
          $scope.video.rating += ratings[i];
        }
        $scope.video.rating = ($scope.video.rating / ratings.length).toFixed(1);
      } else {
        feedback.show("Bad Request, try again");
      }
    }, function errorCallback(response) {
      feedback.show("Bad Request, try again");
    });
  }

  // Close video dialog
  $scope.closeDialog = function() {
    dialogContainer.close();
    var videoDetail = document.querySelector('#video');
    videoDetail.pause();
  }

  // This fucnton logout user session
  $scope.logout = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/user/logout',
      params: {
        "sessionId": session.session
      }
    }).then(function successCallback(response) {
      feedback.show("Bye see you later!");
      setTimeout(function() {
        window.location.href = "/?#/";
      }, 2000);
    }, function errorCallback(response) {
      feedback.show("Bad Request, try again");
    });
  }


});
