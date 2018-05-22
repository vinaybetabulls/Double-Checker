(function () {
    'use strict';

    doubleCheck
        .factory('siteSpeed', siteSpeedFun);

    siteSpeedFun.$inject = ['$http'];
    function siteSpeedFun($http) {
        var service = {
            getMobileResponse: getMobileResponse,
            getDesktopResponse : getDesktopResponse
        };

        return service;

        ////////////////
        function getMobileResponse(websiteurl) {
           return $http({
               type:"GET",
               url : "https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url="+websiteurl+"&strategy=mobile&key=AIzaSyB3oUBFThfsTxPRvpHTtRmGitGPHryvgmQ&screenshot=true",
               
           })
        }

        function getDesktopResponse(websiteurl){
           return $http({
                type:"GET",
                url : "https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url="+websiteurl+"&strategy=desktop&key=AIzaSyB3oUBFThfsTxPRvpHTtRmGitGPHryvgmQ&screenshot=true"
            })
        }
    }
})();


(function () {
    'use strict';

    doubleCheck
        .factory('UrlValidationService', UrlValidationServiceFun);

    UrlValidationServiceFun.$inject = ['$q'];
    function UrlValidationServiceFun($q) {
        var service = {
            checkUrlValidity: checkUrlValidity
        };

        return service;

        ////////////////
        function checkUrlValidity(siteurl) {
            const url = siteurl;
            const domain = url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
            let websiteurl;
            var deferred = $q.defer();
            if (url.indexOf('http:' || 'https:') > -1) {
                websiteurl = url
                console.log('contain http:');
                console.log("**" + url);
                // resolve the deferred
                deferred.resolve(websiteurl);
            }
            else if (url.indexOf('https:') > -1) {
                websiteurl = url;
                console.log('contain https:');
                console.log("***" + url);
                deferred.resolve(websiteurl);
            }
            else {
                let str = "http://";
                websiteurl = str.concat(url);
                deferred.resolve(websiteurl);

            }
            return $q.when(websiteurl);
        }
    }
})();