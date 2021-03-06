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

    $scope.reCalculate = function () {

        $scope.serviceFee = parseFloat(1500) + parseFloat(0.05 * $scope.borrow);
        $scope.interestRate = parseFloat(0.0034 * $scope.date_value * $scope.borrow);
        $scope.interest = parseFloat($scope.interestRate) + parseFloat($scope.serviceFee);
        $scope.total = parseFloat($scope.borrow) + parseFloat($scope.interest);
    };

    $scope.init = function () {

        var num = 0.0;
        $scope.min = 1000.0;
        $scope.max = 5000.0;

        $scope.start = 10;
        $scope.end = 40;

        $scope.date_value = localStorage.getItem('date_value');

        if (! $scope.date_value) {
            $scope.date_value = $scope.start;
        }

        $scope._date = new Date(new Date().getTime()+($scope.date_value*24*60*60*1000));

        $scope.borrow = localStorage.getItem('borrow');

        if (! $scope.borrow) {
            $scope.borrow = 1000.0;
        }

        $scope.vat = 5;
        $scope.processingFee = 0.5;

        $scope.reCalculate();
    };

    $scope.valueChanges = function () {
        $scope.reCalculate();
    };

    $scope.dateChange = function () {
        $scope._date = new Date(new Date().getTime()+($scope.date_value*24*60*60*1000));
        $scope.reCalculate();
    };

    $scope.submit = function () {
        $.post('/compute', {
            serviceFee: $scope.serviceFee,
            interest: $scope.interest,
            total: $scope.total,
            borrow: $scope.borrow
        }, function (data, status) {
            localStorage.setItem("service_fee", $scope.serviceFee);
            localStorage.setItem("interest", $scope.interest);
            localStorage.setItem("total", $scope.total);
            localStorage.setItem('borrow', $scope.borrow);
            localStorage.setItem('date_value', $scope.date_value);
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