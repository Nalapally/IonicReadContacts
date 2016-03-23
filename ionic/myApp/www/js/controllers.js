angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$cordovaContacts,$ionicLoading,$cordovaZip) {


  $scope.loadData =function(){
    $http.get("http://www.w3schools.com/angular/customers.php")
        .then(function (response) {$scope.names = response.data.records;},

        function(response){
          alert(response.data);
        });
  }

  $scope.call = function(number){
    if(number!=undefined)
    {
      if(number.length==10)
      window.open('tel:' + number, '_system');
    }

  }

  $cordovaZip
      .unzip(
        src, // https://github.com/MobileChromeApps/zip/blob/master/tests/tests.js#L32
        dest // https://github.com/MobileChromeApps/zip/blob/master/tests/tests.js#L45
      ).then(function () {
        console.log('success');
      }, function () {
        console.log('error');
      }, function (progressEvent) {
        // https://github.com/MobileChromeApps/zip#usage
        console.log(progressEvent);
      });
  });



  $scope.getContactList = function() {
      $ionicLoading.show({
              template: '<i class="icon ion-loading-c"></i> Loading...'
          });
      $cordovaContacts.find({filter: ''}).then(function(result) {
          $scope.contacts = result;
          $ionicLoading.hide();
      }, function(error) {
          console.log("ERROR: " + error);
      });
  }


})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
