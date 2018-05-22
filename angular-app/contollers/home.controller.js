(function() {
    'use strict';

    
    doubleCheck.controller('headerController', headerControllerFun);

        headerControllerFun.$inject = ['$rootScope','$scope','$stateParams'];
    function headerControllerFun($rootScope,$scope,$stateParams) {
    //    $scope.isActive = true;
    //    $scope.isActive1 = false;
    //    $scope.isActive2 = false;
    //    $scope.isActive3 = false;
    if(window.location.href.split("/")[6]=="brokenLink"){
        $rootScope.isActive3 = true;
        $rootScope.isActive2 = false;
        $rootScope.isActive1 = false;
        $rootScope.isActive = false;
    }
    else if(window.location.href.split("/")[6]=="worddensity"){
        $rootScope.isActive2 = true;
        $rootScope.isActive3 = false;
        $rootScope.isActive1 = false;
        $rootScope.isActive = false;
    }
   else if(window.location.href.split("/")[6]=="spellcheck"){
        $rootScope.isActive1 = true;
        $rootScope.isActive2 = false;
        $rootScope.isActive3 = false;
        $rootScope.isActive = false;
    }
    else{
        $rootScope.isActive = true;
        $rootScope.isActive1 = false;
        $rootScope.isActive2 = false;
        $rootScope.isActive3 = false;
    }
 //   $scope.isActive3 = $stateParams.brokenlink;
       $scope.activeButton = function(){
        $rootScope.isActive = true;
        $rootScope.isActive1 = false;
        $rootScope.isActive2 = false;
        $rootScope.isActive3 = false;
       }
       $scope.activeButton1 = function(){
        $rootScope.isActive1 = true;
        $rootScope.isActive2 = false;
        $rootScope.isActive3 = false;
        $rootScope.isActive = false;
       }
       $scope.activeButton2= function(){
        $rootScope.isActive3 = false;
        $rootScope.isActive2 = true;
        $rootScope.isActive1 = false;
        $rootScope.isActive = false;
       }
       $scope.activeButton3= function(){
        $rootScope.isActive3 = true;
        $rootScope.isActive2 = false;
        $rootScope.isActive1 = false;
        $rootScope.isActive = false;
       }
    }
})();

(function () {
    'use strict';

    doubleCheck.controller('SiteSpeedController', SiteSpeedControllerFun);

    SiteSpeedControllerFun.$inject = ['$scope', 'UrlValidationService', 'siteSpeed'];
    function SiteSpeedControllerFun($scope, UrlValidationService, siteSpeed) {
        $scope.desktopScore = 0;
        $scope.mobileScore = 0;
        $scope.siteURL = {};
        $scope.done = '';
        $scope.analyzeButtonText = 'Analyze'
        $scope.analyzeWebsite = function () {
            // $scope.loading = true;
            // var myEl = angular.element( document.querySelector( '#analyzeBtn' ) );
            // myEl.addClass('loading'); 
            // myEl.attr('disabled', true); 
            console.log($scope.siteURL.url)
            UrlValidationService.checkUrlValidity($scope.siteURL.url).then(function (response) {
                $scope.urlError = false;
                $scope.analyzeButtonText = 'Analyzing'
                siteSpeed.getMobileResponse(response).then(function (mobileResponse) {
                    siteSpeed.getDesktopResponse(response).then(function (desktopResponse) {
                        $scope.loading = false;
                        $scope.analyzeButtonText = 'Analyze'
                        // var element = angular.element( document.querySelector( '#analyzeBtn' ) );
                        // element.removeClass('loading');
                        // element.attr('disabled', null);
                        // $scope.done = 'done';
                        $scope.desktopScore = desktopResponse.data.ruleGroups.SPEED.score;
                        $scope.mobileScore = mobileResponse.data.ruleGroups.SPEED.score;
                        $scope.Mobile_RESPONSE_TIME = mobileResponse.data.formattedResults.ruleResults.MainResourceServerResponseTime.urlBlocks[0].header.args[0].value;
                        $scope.Desktop_RESPONSE_TIME = desktopResponse.data.formattedResults.ruleResults.MainResourceServerResponseTime.urlBlocks[0].header.args[0].value;

                    })

                })
                    .catch(function (err) {
                        $scope.analyzeButtonText = 'Analyze'
                        $scope.urlError = true;
                        //$scope.loading = false;
                        // var element = angular.element( document.querySelector( '#analyzeBtn' ) );
                        // element.removeClass('loading');
                        // element.attr('disabled', null);
                        $scope.done = 'done';
                    })

            })
        }
    }
})();

