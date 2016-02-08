

(function () {
    'use strict';

    angular.module('product').controller('ProductController', ['$scope', 'Authentication',
        function ($scope, Authentication) {
            $scope.authentication = Authentication;



        }
    ]);
})();
