/**
 * Created by stikks on 8/7/16.
 */
'use strict';

var _app = angular.module('mainApp', []);

_app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol("[[").endSymbol("]]");
});

_app.controller('LoginController', function () {
    
});

_app.controller('CalculateController', function ($scope) {

    var num = 0.0;
    $scope.min = 1000;
    $scope.max = 5000;
    $scope.value = 1000;

    $scope.start = 10;
    $scope.end = 40;
    $scope.date_value = 10;

    $scope.today = new Date();
    $scope._date = $scope.today.setDate($scope.today.getDate() + $scope.date_value);

    $scope.serviceFee = 1500;
    $scope.vat = 5;
    $scope.processingFee = 0.5;

    $scope.Borrow = $scope.value;

    $scope.Changes = function (result) {
        console.log(result);
    };

    $scope.dateChange = function (val) {
        console.log(val);
    }
    
});