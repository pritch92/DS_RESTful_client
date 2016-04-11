'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.factory('Users', function($resource){
    return $resource('http://localhost:8080/BrainstormServer/sp/users', {}, {
        findAll:{method:'GET', isArray:true}
    });
})

.factory('Comments', function($resource){
    return {
        getComments: function(id){
            return $resource('http://localhost:8080/BrainstormServer/sp/comments/:username').get(
                    {
                        username: id
                    }
            
                    
            );
                
            
        }
    };
})
.controller('View1Ctrl', function($scope, Users, Comments) {
        $scope.allUsers = Users.findAll();
        $scope.showComments = function(users){
            $scope.selectedUser = users;
            $scope.selectedComment = Comments.getComments(users.username);
        }
});



