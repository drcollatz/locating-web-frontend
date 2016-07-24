function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('Home', {
      url: '/',
      views: {
        'content': {
          controller: 'CurrentVisitorsCtrl as visitors',
          templateUrl: 'currentVisitors.html'
        },
        'navigation': {
          controller: 'NavigationCtrl as navigation',
          templateUrl: 'navigation.html'
        }
      },
      title: 'Visitors'
    }).state('Visitors', {
      url: '/visitors',
      views: {
        'content': {
          controller: 'CurrentVisitorsCtrl as visitors',
          templateUrl: 'currentVisitors.html'
        },
        'navigation': {
          controller: 'NavigationCtrl as navigation',
          templateUrl: 'navigation.html'
        }
      },
      title: 'Visitors'
    }).state('SetupPeople', {
      url: '/people',
      views: {
        'content': {
          controller: 'SetupPeopleCtrl as setupPeople',
          templateUrl: 'setupPeople.html',
        },
        'navigation': {
          controller: 'NavigationCtrl as navigation',
          templateUrl: 'navigation.html'
        }
      },
      title: 'Setup People'
    }).state('EditPerson', {
      url: '/person/:id',
      views: {
        'content': {
          controller: 'PersonDetailsCtrl as editPerson',
          templateUrl: 'editPerson.html',
        },
        'navigation': {
          controller: 'NavigationCtrl as navigation',
          templateUrl: 'navigation.html'
        }
      },
      title: 'Edit Person'
    }).state('Signals', {
      url: '/signals',
      views: {
        'content': {
          controller: 'SignalsCtrl as signalsCtrl',
          templateUrl: 'signals.html',
        },
        'navigation': {
          controller: 'NavigationCtrl as navigation',
          templateUrl: 'navigation.html'
        }
      },
      title: 'Received signals'
    }).state('NewPerson', {
      url: '/person',
      views: {
        'content': {
          controller: 'PersonDetailsCtrl as editPerson',
          templateUrl: 'editPerson.html',
        },
        'navigation': {
          controller: 'NavigationCtrl as navigation',
          templateUrl: 'navigation.html'
        }
      },
      title: 'Edit Person'
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
