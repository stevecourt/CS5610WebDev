"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $q) {

        var api = {
            login: login,
            logout: logout,
            register: register,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function login(user) { //TODO: Change to .then style?

            console.log("entered client service");

            return $http.post("/api/assignment/login", user);
        }

        function logout() { //TODO: Change to .then style?

            console.log("entered client service");

            return $http.post("/api/assignment/logout");
        }

        function register(user) {  //TODO: Change to .then style?

            console.log("entered client service");

            return $http.post("/api/assignment/register", user);
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user?username=" + username)
                .then(function (user) {
                    deferred.resolve(user);
            }, function(user) {
                deferred.reject(user);
            });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user?username=" + username + "&password=" + password)
                .then(function(user){
                    deferred.resolve(user);
                }, function (user) {
                    deferred.reject(user);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();

            $http.get("/api/assignment/admin/user")
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function createUser(newUser) {
            var deferred = $q.defer();

            // Converts emails and phones from comma separated strings to arrays.
            //var serverUser = emailAndPhoneToArray(user);
            $http.post("/api/assignment/admin/user", newUser)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/user/" + userId)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();

            // Converts emails and phones from comma separated strings to arrays.
            var serverUser = emailAndPhoneToArray(user);
            $http.put("/api/assignment/user/" + userId, serverUser)
                .then(function(users){
                    deferred.resolve(users);
                }, function (users) {
                    deferred.reject(users);
                });

            return deferred.promise;
        }

        function emailAndPhoneToArray(user) {
            var serverUser = user;
            if (user.emails) {
                var userEmails = csvToArray(user.emails);
                serverUser.emails = userEmails;
            }
            if (user.phones) {
                var userPhones = csvToArray(user.phones);
                serverUser.phones = userPhones;
            }
            return serverUser;
        }

        function csvToArray(commaSeparatedString) {
            var array = commaSeparatedString.split(",");
            return array;
        }
    }
})();