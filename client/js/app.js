var crossOver = angular.module('crossoverApp', ['ngRoute']);

// Store Session ID until app still alive
crossOver.factory("session", function() {
  return {};
});


// Feedback service
crossOver.factory("feedback", function() {
  return {
    show: function(msg) {
      var snackbarContainer = document.querySelector('#snackbar');
      var data = {
        message: msg
      };
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
  };
});

// Dialog service
crossOver.factory("dialog", function() {
  return {
    create: function(msg) {
      var dialog = document.querySelector('dialog');
      if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }
      return dialog;
    }
  };
});
