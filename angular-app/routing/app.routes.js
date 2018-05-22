var doubleCheck = angular.module('DoubleCheck', [
    'ui.router'
]);
doubleCheck.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: './views/home.html',
            controller: 'SiteSpeedController'
        })
        .state('spellcheck',{
            url : "/spellcheck/:brokenLink",
            templateUrl : "./views/spell-check.html"
        })
        .state('worddensity',{
            url : '/word-density/:brokenLink',
            templateUrl : './views/word-density.html'
        })
        .state('brokenLinks',{
            url : '/broken-links/:brokenLink',
            templateUrl : './views/is-checker.html',
        })
    $urlRouterProvider.otherwise('/')
})