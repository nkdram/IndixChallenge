(function () {
    'use strict';

    angular.module('dashboard').controller('DashboardController', ['$scope', 'Authentication','$http',
        function ($scope, Authentication,$http) {
            $scope.authentication = Authentication;
            $scope.processed = true;

            $scope.getCategorizedProducts = function(){

                $http.get('/list').success(function (data, status, headers, config) {
                    if(status != 200){
                        $scope.processed = false;
                    }
                    else
                    {
                        $scope.highest = data.highestPercent;
                        $scope.lowest = data.lowestPercent;
                        $scope.tableData = data.data;

                        data.data.forEach(function(category){
                            category.catArr.forEach( function(category){
                                var
                                    red = new Color(232, 9, 26),
                                    white = new Color(255, 255, 255),
                                    green = new Color(6, 170, 60),
                                    start = green,
                                    end = white;

                                //var percent = category.percent < 0 ? Math.abs(category.percent)/$scope.highest :
                                var percent = category.percent < 0 ?  (1 + (((50 - 1) / 50) * Math.abs(category.percent)))
                                     : (50 + (((100 - 51) / 100) * Math.abs(category.percent)));
                                /*if (val > 50) {
                                    start = white,
                                        end = red;
                                    val = val % 51;
                                }*/
                                if(category.percent == 0) {
                                    percent = 50;

                                    category.style = "#FFFFFF";
                                }

                                else
                                {

                                   // rgbToHex()
                                    var startColors = start.getColors(),
                                        endColors = end.getColors();
                                    var r = Interpolate(startColors.r, endColors.r, 50, percent);
                                    var g = Interpolate(startColors.g, endColors.g, 50, percent);
                                    var b = Interpolate(startColors.b, endColors.b, 50, percent);
                                    category.style =
                                        "rgb(" + r + "," + g + "," + b + ")";
                                }

                            });
                        });



                    }
                });

            };

            function rgbToHex(r, g, b) {
                return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
            }
            function componentToHex(c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }


            function Interpolate(start, end, steps, count) {
                var s = start,
                    e = end,
                    final = s + (((e - s) / steps) * count);
                return Math.floor(final);
            }

            function Color(_r, _g, _b) {
                var r, g, b;
                var setColors = function(_r, _g, _b) {
                    r = _r;
                    g = _g;
                    b = _b;
                };

                setColors(_r, _g, _b);
                this.getColors = function() {
                    var colors = {
                        r: r,
                        g: g,
                        b: b
                    };
                    return colors;
                };
            }

            $(document).on({
                change: function(e) {

                    var self = this,
                        span = $(self).parent("span"),
                        val = parseInt(self.value),
                        red = new Color(232, 9, 26),
                        white = new Color(255, 255, 255),
                        green = new Color(6, 170, 60),
                        start = green,
                        end = white;

                    $(".value", span).text(val);

                    console.log(val);
                    if (val > 50) {
                        start = white,
                            end = red;
                        val = val % 51;
                    }
                    console.log(val);
                    var startColors = start.getColors(),
                        endColors = end.getColors();
                    var r = Interpolate(startColors.r, endColors.r, 50, val);
                    var g = Interpolate(startColors.g, endColors.g, 50, val);
                    var b = Interpolate(startColors.b, endColors.b, 50, val);

                    span.css({
                        backgroundColor: "rgb(" + r + "," + g + "," + b + ")"
                    });
                }
            }, "input[type='range']");

        }
    ]);
})();

