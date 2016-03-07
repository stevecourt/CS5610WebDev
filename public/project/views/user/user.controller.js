"use strict";

(function () {
    angular
        .module("BookExchangeApp")
        .controller("UserController", userController);

    function userController($scope, UserService) {

        $scope.addUser = addUser;
        $scope.selectUser = selectUser;
        $scope.changeUser = changeUser;
        $scope.removeUser = removeUser;

        // Get all users for rendering.
        getAllUsers();
        function getAllUsers() {
            var callback = function (users) {
                $scope.allUsers = users;
            };

            UserService.findAllUsers(callback);
        }

        function addUser(user) {
            var callback = function (users) {
                // Get all users for rendering.
                // Note: Retain this format for easier modification later to users per domain object.
                UserService.findAllUsers(
                    function (users) {
                        $scope.allUsers = users;
                    }
                )
            };

            UserService.createUser(user, callback);
        }

        function selectUser(index) {
            $scope.selectedUserIndex = index;
            $scope.user = {
                firstName: $scope.allUsers[index].firstName,
                lastName: $scope.allUsers[index].lastName,
                email: $scope.allUsers[index].email,
                username: $scope.allUsers[index].username,
                password: $scope.allUsers[index].password
            };
        }

        function changeUser(user) {
            var callback = function (newUser) {
                $scope.allUsers[$scope.selectedUserIndex] = newUser;
                // Get all users for rendering.
                // Note: Retain this format for easier modification later to users per domain object.
                UserService.findAllUsers(
                    function (users) {
                        $scope.allUsers = users;
                    }
                )
            };

            UserService.updateUser(user, callback);
        }

        function removeUser(user) {
            var callback = function (users) {
                // Get all users for rendering.
                // Note: Retain this format for easier modification later to users per domain object.
                UserService.findAllUsers(
                    function (users) {
                        $scope.allUsers = users;
                    }
                )
            };

            UserService.deleteUser(user, callback);
        }
    }
})();
