'use strict';

angular.module('msrsApp')
  .controller('RaphaelCtrl', function ($scope) {
  	var width = angular.element('#video').videoWidth;
  	console.log('putaaaaain');
  	console.log("dasdadads" + width);
    $scope.message = 'Hello';
    $scope.fakeDataSets = {
        biology: {
            male: 20,
            female: 5
        },
        physics: {
            male: 10,
            female: 10
        }             
    }
  })
 .directive('gaugeChart', [function () {
    var size = 200,
        chartWidth = size,
        chartHeight = size,
        centerX = (chartWidth/2),
        centerY = (chartHeight/2),
        radius = size * .3,
        strokeWidth = size * .15;
    
    // Necessary to draw the arc
    function calculateArc (value) {
        var xloc = centerX,
            yloc = centerY,
            total = 100, 
            R = radius,
            alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = xloc + R * Math.cos(a),
            y = yloc - R * Math.sin(a),
            path;
        
        if (total == value) {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
            ];
        } else {
            path = [
                ["M", xloc, yloc - R],
                ["A", R, R, 0, +(alpha > 180), 1, x, y]
            ];
        }
        
        return {
            path: path
        };
    }
    
    function calculateStrokeColor (value) {
        var result;
        
        if ( value > 66) {
            result = '#F00';
        } else if ( value > 33) {
            result = '#FF0';
        } else {
            result = '#0F0';
        }
        
        return result;
    }
    
    var declaration = {};
    
    declaration.restrict = 'EA';
    
    declaration.scope = {
        'percent' : '='
    };
    
    declaration.link = function (scope, element, attrs) {
        // Create Canvas
        var paper = Raphael(element[0], chartWidth, chartHeight),
            arc,
            text;
        
        // Attach the custom arc code
        paper.customAttributes.arc = calculateArc;
        
        arc = paper.path().attr({
            "stroke":  '#FFF',
            "stroke-width": strokeWidth,
            arc : 0
        });
        
        text = paper.text().attr({
            x : centerX,
            y : centerY
        });
        
        scope.$watch('percent', function (newPercent) {
            var iPercent = parseInt(newPercent, 10),
                percent = Math.min(100, Math.max(0, iPercent));
            
            scope.percent = percent;
            
            if (!isNaN(iPercent)) {
                text.attr({
                    text: '' + percent + '%'
                });
        
               arc.animate({
                   arc: percent,
                   'stroke' : calculateStrokeColor(percent) 
                }, 1000, "bounce");
            }
        });
    };
    
    return declaration;
}])


.controller('GaugeController', ['$scope', function ($scope) {
    $scope.testGauge1 = 95;
    $scope.testGauge2 = 13;

    $scope.add = function (x) {
        $scope[x] += 5;
    }
    
    $scope.minus = function (x) {
        $scope[x] -= 5;
    }
}]);
