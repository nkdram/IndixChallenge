(function () {
    'use strict';

    // Setting up route
    angular.module('dashboard').config(['$stateProvider',
        function ($stateProvider) {
            // Users state routing
            $stateProvider.
                state('dashboard', {
                    url: '/product',
                    templateUrl: '/assets/modules/product/views/products.html'
                })

        }
    ]);
})();
