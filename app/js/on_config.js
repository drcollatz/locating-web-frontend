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
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
