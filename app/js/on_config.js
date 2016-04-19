function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    views: {
      'content': {
        controller: 'ExampleCtrl as home',
        templateUrl: 'home.html'
      },
      'navigation': {
        controller: 'NavigationCtrl as navigation',
        templateUrl: 'navigation.html'
      }
    },
    title: 'Home'
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
