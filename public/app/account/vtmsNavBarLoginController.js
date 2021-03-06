angular.module('vtms').controller('vtmsNavBarLoginController', function($scope, $http, vtmsIdentity, vtmsNotifier, vtmsAuth, $location) {
  $scope.identity = vtmsIdentity;

  $scope.signin = function(username, password) {
    vtmsAuth.authenticateUser(username, password).then(function(success) {
      if(success) {
        vtmsNotifier.notify('You have successfully signed in!');
        if(vtmsAuth.authorizeCurrentUserIsTeamMember()) {
          $location.path('/tasklist');
        }
      } else {
        vtmsNotifier.error('The username or password was incorrect.');
      }
    });
  };

  $scope.signout = function() {
    vtmsAuth.logoutUser().then(function() {
      $scope.username = "";
      $scope.password = "";
      vtmsNotifier.notify('You have successfully signed out');
      $location.path('/');
    });
  };
});
