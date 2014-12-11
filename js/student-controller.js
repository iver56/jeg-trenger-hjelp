jegTrengerHjelpControllers.controller('StudentCtrl', function($scope, $firebase, $ionicModal) {
  $scope.userId = localStorage.getItem('userId');
  if (!$scope.userId) {
    $scope.userId = guid();
    localStorage.setItem('userId', $scope.userId);
  }

  $scope.inputNameMode = {value: true};
  $scope.name = { text: localStorage.getItem('userName') };
  if ($scope.name.text) {
    $scope.inputNameMode.value = false;
  }
  $scope.nameOk = function() {
    $scope.inputNameMode.value = false;
    localStorage.setItem('userName', $scope.name.text);
  };

  $scope.getEnqueuedItemIndex = function() {
    console.log('checking index...');
    for (var i = 0; i < $scope.queue.length; i++) {
      var queueItem = $scope.queue[i];
      if (queueItem.id === $scope.userId) {
        return i;
      }
    }
    return -1;
  };

  var lastEnqueued = null;
  $scope.enqueue = function() {
    if (lastEnqueued && (Date.now() - lastEnqueued) < 300) {
      return;
    }
    if ($scope.getEnqueuedItemIndex() >= 0) {
      return;
    }
    $scope.queue.$add({id: $scope.userId, name: $scope.name.text});
    lastEnqueued = Date.now();
  };

  $scope.dequeue = function() {
    var i = $scope.getEnqueuedItemIndex();
    if (i >= 0) {
      var item = $scope.queue[i];
      $scope.queue.$remove(item);
    }
  };

  $ionicModal.fromTemplateUrl('templates/info-modal.html', {scope: $scope}).then(function(modal) {
    $scope.infoModal = modal;
  });
  $scope.$on('$destroy', function() {
    $scope.infoModal.remove();
  });

  var ref = new Firebase(firebaseUrl);
  var sync = $firebase(ref);
  $scope.queue = sync.$asArray();
});
