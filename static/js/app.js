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

_app.controller('CalculateController', function ($scope, $window) {

    var num = 0.0;
    $scope.min = 1000.0;
    $scope.max = 5000.0;
    $scope.value = 1000.0;

    $scope.start = 10;
    $scope.end = 40;
    $scope.date_value = 10;

    $scope.today = new Date();
    $scope._date = $scope.today.setDate($scope.today.getDate() + $scope.date_value);

    $scope.Borrow = $scope.value;

    $scope.vat = 5;
    $scope.processingFee = 0.5;

    $scope.reCalculate = function () {

        $scope.serviceFee = 1500 + (5/100 * $scope.Borrow);
        $scope.interestRate = (0.34 * $scope.date_value* $scope.Borrow)/100;
        $scope.interest = parseInt($scope.interestRate) + parseInt($scope.serviceFee);
        $scope.total = $scope.Borrow + $scope.interest;

    };

    $scope.reCalculate();

    $scope.valueChanges = function () {
        $scope.reCalculate();
    };

    $scope.dateChange = function (val) {
        $scope._date = $scope.today;
        $scope._date.setDate($scope._date.getDate() + val);
    };

    $scope.submit = function () {
        $.post('/compute', {
            serviceFee: $scope.serviceFee,
            interest: $scope.interest,
            total: $scope.total,
            borrow: $scope.Borrow,
        }, function (data, status) {
            localStorage.setItem("service_fee", $scope.serviceFee);
            localStorage.setItem("interest", $scope.interest);
            localStorage.setItem("total", $scope.total);
            localStorage.setItem('borrow', $scope.Borrow);
        });
        location.href = '/cash';
    }
});

_app.controller('ProfileController', function ($scope) {

    $scope.error = null;

    $scope.service_fee = localStorage.getItem('service_fee');
    $scope.interest = localStorage.getItem('interest');
    $scope.total = localStorage.getItem('total');
    $scope.borrow = localStorage.getItem('borrow');

    $scope.checkPassword = function () {
        if ($scope.password != $scope.verify){
            $scope.error = "Passwords do not match";
        }
        else {
            $scope.error = null;
        }
    }
});