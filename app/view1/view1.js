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

.factory('NewUsers', function($resource){
    return {
        users: $resource('http://localhost:8080/BrainstormServer/sp/users', {}, {
            create1: {method:'POST', data:'newUser1'}
        }),
        comments: $resource('http://localhost:8080/BrainstormServer/sp/comments', {}, {
            create2: {method:'POST', data:'newUser2'}
        })
    };
    
})



.controller('View1Ctrl', function($scope, Users, Comments, NewUsers) {
        
        $scope.newUser = '';
        $scope.allUsers = Users.findAll();
        $scope.showComments = function(users){
            $scope.selectedUser = users;
            $scope.selectedComment = Comments.getComments(users.username);
        };
        
        $scope.postComments = function(newUser){
            var newUser1 = {
                "username":newUser.username,
                "name":newUser.name,
                "company":newUser.company
            };
            var newUser2 = {
               "username":newUser.username,
                "comment":newUser.comment
            };
            NewUsers.users.create1(newUser1);
            NewUsers.comments.create2(newUser2);
            
        };
        
      
        
        
});

