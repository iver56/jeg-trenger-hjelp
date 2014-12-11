angular.module('jegTrengerHjelp', ['ionic', 'jegTrengerHjelp.controllers', 'firebase'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };
})();

jegTrengerHjelpControllers = angular.module('jegTrengerHjelp.controllers', []);
