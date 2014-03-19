var dishApp = angular.module('dishApp', ['ngRoute']).config(['$routeProvider', '$locationProvider', 
	function ($routeProvider, $locationProvider) {
		$routeProvider.
			when('/dishes', {
				templateUrl: '/templates/dishesList.html',
				controller: 'dishesListController'
			}).
               otherwise({
                    redirectTo: '/dishes'
               });
          $locationProvider.html5Mode(true)
	}]);

dishApp.controller('dishesListController', function ($scope, $http) {
     $scope.pagination = {
          currentPage: 1,
          count: 16,
          pages: [],
     }

     $scope.loadDishes = function () {
          $http.get ('/api/dishes', {params: {filter: $scope.expression}}).
               success(function (data) {
                    
                    $scope.dishes = data.dishes;
                    $scope.pagination.totalPages = Math.ceil($scope.dishes.length / $scope.pagination.count);
                    $scope.pagination.pages = [];

                    for (var i = 0; i < $scope.pagination.totalPages; i++) {
                         $scope.pagination.pages.push(i);
                    }

                    $scope.setPage(0);
               }).
               error (function (data) {
                    console.log('Error ' + data);
          }); 
     }
     
     $scope.setPage = function (n) {
          $scope.pagination.currentPage = n;
          $scope.contents = [];
          var from = (n) * $scope.pagination.count;
          var to = from + $scope.pagination.count;

          for (var i = from; i < to && $scope.dishes[i]; i++) {
               $scope.contents.push($scope.dishes[i]);
          } 
     }

     $scope.$watch('pagination.currentPage', $scope.setPage());

     $scope.nextPage = function () {
          if ($scope.pagination.currentPage < $scope.pagination.totalPages) {
               $scope.pagination.currentPage++;
               $scope.setPage($scope.pagination.currentPage);
          }
     };

     $scope.prevPage = function () {
          if ($scope.pagination.currentPage > 0) {
               $scope.pagination.currentPage--;
               $scope.setPage($scope.pagination.currentPage);
          }
     };

     $scope.firstPage = function () {
          $scope.pagination.currentPage = 0;
           $scope.setPage($scope.pagination.currentPage);
     }

     $scope.lastPage = function () {
          $scope.pagination.currentPage = $scope.pagination.totalPages - 1;
          $scope.setPage($scope.pagination.currentPage);
     }

     $scope.loadDishes();
 
});