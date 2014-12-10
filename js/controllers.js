angular.module('jegTrengerHjelp.controllers', [])

  .controller('StudentCtrl', function($scope, $firebase) {
    $scope.inputNameMode = {value: true};
    $scope.name = { text: "" };
    $scope.isHelpNeeded = {value: false};

    $scope.nameOk = function() {
      $scope.inputNameMode.value = false;
    };

    $scope.needHelp = function() {
      $scope.isHelpNeeded.value = true;
    };

    $scope.neverMind = function() {
      $scope.isHelpNeeded.value = false;
    };

    var ref = new Firebase(firebaseUrl);
    var sync = $firebase(ref);
    $scope.queue = sync.$asArray();
  });
