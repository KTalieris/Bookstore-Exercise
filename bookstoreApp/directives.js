// DIRECTIVES

bookStoreApp.directive('bookRating', function (bookService) {
  return {
    restrict: 'A',
    template: '<ul class="star">' +
        '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
        '\u2605' +
        '</li>' +
        '</ul>',
    scope: {
      bookRatingVal: '=',
      bookTitle: '=',
      maxRating: '=',
    },
    link: function (scope, elem, attrs) {

      var starStyleUpdate = function () {
        scope.stars = [];
        for (var i = 0; i < scope.maxRating; i++) {
          scope.stars.push({
            filled: i < scope.bookRatingVal
          });
        }
      };

      var updateRatingInBooksRecord = function () {
        /* Get book by title and update it's rating using bookService */
        bookService.setBookRating(bookService.chosen(scope.bookTitle), scope.bookRatingVal);
      }

      scope.toggle = function (index) {
        scope.bookRatingVal = index + 1;
      };

      /* Always watch for changes in book's rating */
      scope.$watch('bookRatingVal', function (previousRating, newRating) {
        if (newRating) {
          /* If there was a change update stars */
          starStyleUpdate();
          /* And also update the record */
          updateRatingInBooksRecord();
        }
      });

    }
  }
});