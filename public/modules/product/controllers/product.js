

(function () {
    'use strict';

    angular.module('product').controller('ProductController', ['$scope', 'Authentication','TimerService','$interval',
        function ($scope, Authentication,TimerService,$interval) {
            $scope.authentication = Authentication;

            $scope.progressstatus = {
                maxcount: 0,
                currentloop: 0,
                percent: 0
            };

            var pageLoader = document.getElementById('pageLoader');
            $scope.exceluploads = function () {
                $scope.error = '';
                $scope.logeachCustomeruploaddata = null;
                var form = document.getElementById('formupload');
                var formData = new FormData(form);
                formData.append('userid', $scope.authentication.user.id);
                pageLoader.setAttribute('style', 'display:block');
                $http.post('/fileupload', formData,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }
                ).success(function (data, status, headers, config) {

                        if (status === 200 && data !== null && data !== '') {
                            data = {customerData: data, userid: $scope.authentication.user.id};
                            customerDataPost(data);
                        } else {
                            $scope.error = 'The uploaded Data is not valid.';
                            pageLoader.setAttribute('style', 'display:none');
                        }
                    }).error(function (data, status, headers, config) {
                        $scope.error = data.message;
                        pageLoader.setAttribute('style', 'display:none');
                    });
            };


            function customerDataPost(jsondatalist) {
                if (jsondatalist !== '' && jsondatalist !== null) {
                    $scope.isDisabled = true;
                    $http.post('/migrationcustomers/upload', jsondatalist).success(function (data, status, headers, config) {
                        $scope.logeachCustomeruploaddata = data;
                        $scope.error = data.message;
                        $scope.progressstatus.maxcount = data.totalcountloop;
                        $scope.progressstatus.currentloop = 1;
                        $scope.progressstatus.percent = getpercent(1, $scope.progressstatus.maxcount);
                        pageLoader.setAttribute('style', 'display:none');
                        // Initizialize function
                        reloadData('/migrationcustomers/getuploadStatus');
                        // Start Interval
                        var timerData =
                            $interval(function () {
                                if ($scope.progressstatus.maxcount !== $scope.progressstatus.currentloop) {
                                    reloadData('/migrationcustomers/getuploadStatus');
                                }
                            }, 20000);

                    }).error(function (data, status, headers, config) {
                        pageLoader.setAttribute('style', 'display:none');
                    });
                } else {
                    $scope.error = 'The Data is Empty.';
                    pageLoader.setAttribute('style', 'display:none');
                }

            }

            function getpercent(currentRow, maxRow) {
                return Math.round((currentRow * 100) / maxRow);
            }

            function reloadData(urlep) {
                // a call to the async method
                TimerService.recentClients(urlep).then(function (response) {
                    // console.log(data);
                    $scope.progressstatus.currentloop = response.data.length;
                    $scope.progressstatus.percent = getpercent($scope.progressstatus.currentloop, $scope.progressstatus.maxcount);
                });
            }

        }
    ]);
})();
