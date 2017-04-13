rapid_frontend_client = angular.module('rapid.frontend.client');

rapid_frontend_client.controller(
  'documentController',
  [
    '$scope',
    'auth',
    'user',
    '$state',
    '$stateParams',
    'API',
    '$http',
    function ($scope, auth, user, $state, $stateParams, API, $http) {

      $scope.document = {data:{}};
      $scope.warning = "";

      // load the document referenced by shortid
      $http( {
        method: 'GET',
        url: API + '/document/' + $stateParams.shortid
      })
      .then(function(response) {
        $scope.document = response.data;
      }, function(err) {
        $scope.warning = err;
      });
    }
  ]
);



