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

_app.controller('CalculateController', function ($scope, $window, $location) {

    $scope.reCalculate = function () {

        $scope.serviceFee = parseFloat(1500) + parseFloat(0.05 * $scope.borrow);
        $scope.interestRate = parseFloat(0.0034 * $scope.date_value * $scope.borrow);
        $scope.interest = parseFloat($scope.interestRate) + parseFloat($scope.serviceFee);
        $scope.total = parseFloat($scope.borrow) + parseFloat($scope.interest);
        $scope._date = new Date(new Date().getTime()+($scope.date_value*24*60*60*1000));
        $scope.repayment_date = $scope._date.toDateString();
    };

    $scope.init = function () {

        $scope.error = localStorage.getItem('error');
        localStorage.setItem('error', '');

        $scope.min = 1000.0;
        $scope.max = 5000.0;

        $scope.start = 10;
        $scope.end = 40;

        $scope.date_value = localStorage.getItem('date_value');

        if (! $scope.date_value) {
            $scope.date_value = $scope.start;
        }

        $scope._date = new Date(new Date().getTime()+($scope.date_value*24*60*60*1000));
        $scope.repayment_date = $scope._date.toDateString();

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

    $scope.submit = function () {
        $.post($location.$$absUrl + '/compute', {
            serviceFee: $scope.serviceFee,
            interest: $scope.interest,
            total: $scope.total,
            borrow: $scope.borrow,
            repayment_date: $scope.repayment_date
        }, function (data, status) {
            localStorage.setItem("service_fee", $scope.serviceFee);
            localStorage.setItem("interest", $scope.interest);
            localStorage.setItem("total", $scope.total);
            localStorage.setItem('borrow', $scope.borrow);
            localStorage.setItem('date_value', $scope.date_value);
            localStorage.setItem('repayment_date', $scope.repayment_date);
        });
        var cash_url = $location.$$absUrl;
        if (cash_url.endsWith('/')) {
            cash_url = cash_url.slice(0,-1)
        }

        location.href = cash_url + '/cash';
    };

    $scope.submit_more = function () {
        $.post($location.$$absUrl + '/compute', {
            serviceFee: $scope.serviceFee,
            interest: $scope.interest,
            total: $scope.total,
            borrow: $scope.borrow,
            repayment_date: $scope.repayment_date
        }, function (data, status) {
           if (data) {
               localStorage.setItem('error', data);
           }
        });

        location.href = $location.$$absUrl;
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

_app.controller('MoreController', function ($scope, $window, $location) {

    $scope.reCalculate = function () {

        $scope.serviceFee = parseFloat(1500) + parseFloat(0.05 * $scope.borrow);
        $scope.interestRate = parseFloat(0.0034 * $scope.date_value * $scope.borrow);
        $scope.interest = parseFloat($scope.interestRate) + parseFloat($scope.serviceFee);
        $scope.total = parseFloat($scope.borrow) + parseFloat($scope.interest);
        $scope._date = new Date(new Date().getTime()+($scope.date_value*24*60*60*1000));
        $scope.repayment_date = $scope._date.toDateString();
    };

    $scope.init = function () {

        $scope.min = 1000.0;
        $scope.max = 5000.0;

        $scope.start = 10;
        $scope.end = 40;

        $scope.date_value = localStorage.getItem('date_value');

        if (! $scope.date_value) {
            $scope.date_value = $scope.start;
        }

        $scope._date = new Date(new Date().getTime()+($scope.date_value*24*60*60*1000));
        $scope.repayment_date = $scope._date.toDateString();

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

    $scope.submit = function () {
        $.post('/user/compute', {
            serviceFee: $scope.serviceFee,
            interest: $scope.interest,
            total: $scope.total,
            borrow: $scope.borrow,
            repayment_date: $scope.repayment_date
        }, function (data, status) {

        });
    }
});