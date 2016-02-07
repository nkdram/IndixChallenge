(function () {
    'use strict';

    angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', 'ReturnUrl',
        function ($scope, $http, $location, Authentication, ReturnUrl) {
            $scope.authentication = Authentication;

            // If user is signed in then redirect back home
            if ($scope.authentication.user)
                $location.path('/dashboard');

            $scope.signin = function () {
                $http.post('/auth/signin', $scope.credentials).success(function (response) {
                    // If successful we assign the response to the global user model
                    $scope.authentication.user = response;

                    // And redirect to the index page
                    if (!ReturnUrl.return())
                        $location.path('/dashboard');
                }).error(function (response) {
                    $scope.error = response.message;
                });
            };

            $scope.closeError = function () {
                $scope.error = '';
            };
        }
    ]);
})();