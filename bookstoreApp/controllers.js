// CONTROLLERS

/* Controller for the Add Book Page*/
bookStoreApp.controller('addBookController', ['$scope', '$rootScope', 'bookService', function($scope, $rootScope, bookService) {
    $scope.newBook = {
        image:'images/book_image.png',
        isbn: '',
        title: '',
        subtitle: '',
        author: '',
        published: '',
        publisher: '',
        pages: '',
        description: '',
        website: ''
    };

    /* Add the new book */
    $scope.addBook = function () {
        /* Ensure that user creates at least a book with title and description */
        if($scope.newBook.title && $scope.newBook.description){
            $rootScope.bookList = bookService.addInBooks($scope.newBook);
            $scope.lookForNewBook();
        } else {
            alert('Your new book should have at least title and description!');
        }
    }

    /* Check if the book was pushed successfully into the Book list and redirect to your new book page */
    $scope.lookForNewBook = function () {
        $scope.newBookExists = bookService.chosen($scope.newBook.title);
        if ($scope.newBookExists) {
            $rootScope.chosenBook = $scope.newBookExists;
            if (window.location.href.indexOf("Category") <= -1) {
                window.location.href = '#/Category';
            }
        }
    }
}]);

/* Controller for Search and Category Pages */
bookStoreApp.controller('searchController', ['$scope', '$rootScope', '$resource', '$routeParams', 'bookService', function($scope, $rootScope, $resource, $routeParams, bookService) {
    // $scope.filterData = 'name';
    $rootScope.bookList = bookService.books;
    $scope.chosenBookTitle = '';

    /* Get the book which the user clicked on. If he is not at book's page get him there. */
    $scope.showBookInDetail = function(chosenBookTitle) {
        $scope.chosenBookTitle = chosenBookTitle;
        $rootScope.chosenBook = bookService.chosen($scope.chosenBookTitle);
        if (window.location.href.indexOf("Category") <= -1) {
            window.location.href = '#/Category';
        }
    }

    /* Make the slick slider responsive */
    $scope.breakpoints = [
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay:true,
                speed:5000,
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay:true,
                speed:5000,
            }
        }
    ];

    /* Decided not use the following method in order to retrieve the data,
    because the inner quotes in expression "you don't know js" didn't allow the response to be validated as JSON */
    // $scope.booksAPI = $resource("https://gist.githubusercontent.com/nanotaboada/6396437/raw/82dca67cc3b6a5ccfcf8af012664cdaa0025d999/books.json", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    // $scope.booksResult = $scope.booksAPI.get();

}]);