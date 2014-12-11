jegTrengerHjelpControllers.controller('ListCtrl', function($scope, $firebase, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/info-modal.html', {scope: $scope}).then(function(modal) {
    $scope.infoModal = modal;
  });
  $scope.$on('$destroy', function() {
    $scope.infoModal.remove();
  });

  var ref = new Firebase(firebaseUrl);
  var sync = $firebase(ref);
  $scope.queue = sync.$asArray();

  $scope.remove = function(item) {
    $scope.queue.$remove(item);
  };
});
