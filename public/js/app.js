/**
 * Created by KIM-ATIV on 2016-12-08.
 */

var app = angular.module('app', ["ngRoute"]);


app.config(function ($routeProvider) {

    $routeProvider
        .when('/project', {
            templateUrl: "template/routeEx01.html"
        })
        .when('/members', {
            templateUrl: "template/routeEx02.html"
        })
        .when('/message', {
            template: "<h1>Message page</h1>"
        })
        .when('/hub', {
            template: "<h1>HUB</h1>"
        })
        .otherwise( {
            template: "<h1>INDEX</h1>"
        });

});