// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('notes', ['ionic', 'angularMoment','notes.notesStore']);

app.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('list',{
      url : "/list",
      templateUrl : 'templates/list.html'

    });
    $stateProvider.state('edit',{
      url : "/edit/:id",
      templateUrl : 'templates/edit.html',
      controller : 'EditCtrl'
    });
    $stateProvider.state('add',{
      url : "/add",
      templateUrl : 'templates/edit.html',
      controller : 'AddCtrl'
    });
    $urlRouterProvider.otherwise('/list' );
}]);

app.controller('ListCtrl', ['$scope','NoteStore', function ($scope,NoteStore) {
  $scope.notes = NoteStore.list();
  $scope.remove = function (noteId) {
    NoteStore.remove(noteId);
  }
}]);

app.controller('EditCtrl', ['$scope','$state','NoteStore', function ($scope,$state,NoteStore) {
    $scope.note = angular.copy(NoteStore.get($state.params.id));

    $scope.save = function (note) {
      NoteStore.save($scope.note);
      $state.go('list');
    }
  
}]);
app.controller('AddCtrl', ['$scope','$state','NoteStore', function ($scope,$state,NoteStore) {
    $scope.note = {
      id : new Date().getTime(),
      title : '',
      description : ''
    };

    $scope.save = function (note) {
      NoteStore.create($scope.note);
      $state.go('list');
    }
  
}])


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
