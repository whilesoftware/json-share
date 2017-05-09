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

      function print_object(_object, _indent, istring) {
        // check the object type
        // array
          // print starting_indentation + '[' + '\n'
          // call print_object on all array elements
          // print ]
        // dictionary
          // print starting_indentation + '{' + '\n'
          // call print_object on all children
            //what kind of child is this?
            // string
            // number
            // boolean
            // null
            // call print_object(child_object, starting_indentation + '  ');
          // print }

        // switch on object type
        if (angular.isArray(_object)) {
          console.log(_indent + '[');
            // for each element of the array
            angular.forEach(_object, function(value, key) {
              // what kind of value is this?
              if (angular.isObject(value)) {
                print_object(value, _indent + istring, istring);
              }
            });
          console.log(_indent + ']');
        }else if (angular.isObject(_object)) {
          console.log(_indent + '{');
            angular.forEach(_object, function(value, key) {
              var prefix = _indent + istring + '"' + key + '": ';
              // what kind of value is this?
              if (angular.isArray(value)) {
                console.log(prefix);
                print_object(value, _indent + istring + istring, istring);
              }else if (angular.isObject(value)) {
                console.log(prefix);
                print_object(value, _indent + istring + istring, istring);
              }else{
                // this is a base type (number, string, or boolean)
                if (angular.isString(value)) {
                  console.log(prefix + '"' + value + '"');
                }else if (typeof(value) === "boolean"){
                  if (value) {
                    console.log(prefix + 'true');
                  }else{
                    console.log(prefix + 'false');
                  }
                }else if (angular.isNumber(value)) {
                  console.log(prefix + value.toString());
                }
              }
            });
          console.log(_indent + '}');

        }else if (_object == null) {

        }
      }

      // load the document referenced by shortid
      $http( {
        method: 'GET',
        url: API + '/document/' + $stateParams.shortid
      })
      .then(function(response) {
        // create indented, pretty version of this json document
        console.log(JSON.stringify(response.data, null, 2));
        console.log('-----');
        print_object(response.data, '',  '  ');

        // print it to the console
        $scope.document = response.data;
      }, function(err) {
        $scope.warning = err;
      });
    }
  ]
);



