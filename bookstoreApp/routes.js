// ROUTES
bookStoreApp.config(function ($routeProvider, $locationProvider) {

  $locationProvider.hashPrefix('');

  $routeProvider

      .when('/', {
        templateUrl: 'pages/search.htm',
        controller: 'searchController'
      })

      .when('/Search', {
        templateUrl: 'pages/search.htm',
        controller: 'searchController'
      })

      .when('/Category', {
        templateUrl: 'pages/category.htm',
        controller: 'searchController'
      })

      .when('/Book/Add', {
        templateUrl: 'pages/addBook.htm',
        controller: 'addBookController'
      })

});