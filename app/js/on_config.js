function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'ExampleCtrl as home',
    templateUrl: 'home.html',
    title: 'Home'
  }).state('Visitors', {
    url: '/visitors',
    controller: 'CurrentVisitorsCtrl as visitors',
    templateUrl: 'currentVisitors.html',
    title: 'Visitors'
  }).state('SetupPeople', {
    url: '/people',
    controller: 'SetupPeopleCtrl as setupPeople',
    templateUrl: 'setupPeople.html',
    title: 'Setup People'
  }).state('EditPerson', {
    url: '/person/{person:json}',
    controller: 'EditPersonCtrl as editPerson',
    templateUrl: 'editPerson.html',
    title: 'Edit Person'
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
