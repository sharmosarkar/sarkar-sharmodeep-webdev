/**
 * Created by Sharmo on 7/23/2017.
 */

(function () {

    angular
        .module("WamApp")
        .factory("userService", userService);
    //or do
    //>>>>>>    .service("userService", userService);
    // if doing by service, then the functions are instantiated on the instance
    // so ....
    //>>>>>>>    this.findUserByUsernameAndPassword = findUserByUsernameAndPassword;

    function userService($http) {

        // data in service
        var valid_users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api =  {

            'findUserByCredentials' : findUserByCredentials,
            'findUserById' : findUserById,
            'updateUser' : updateUser,
            'deleteUser': deleteUser,
            'createUser':createUser,
            'findUserByUsername': findUserByUsername
        };
        return api;

        function findUserById(userId){
            for (var u in valid_users) {
                var _user = valid_users[u];
                if (_user._id === userId) {
                    return _user;
                }
            }
            return null;
            // return $http.get("http://localhost:3000/api/users/"+userId);
        }

        function findUserByCredentials(username, password) {
            for (var u in valid_users) {
                var _user = valid_users[u];
                if (_user.username === username && _user.password === password) {
                    return _user;
                }
            }
            return null;
        }

        function updateUser(user_id, user) {
            for (var u in valid_users) {
                var _user = valid_users[u];
                if (_user._id === user_id) {
                    _user.username = user.username;
                    _user.firstName = user.firstName;
                    _user.lastName = user.lastName;
                   return "Updated";
                }
            }
            return "Couldn't Find User";
        }

        function deleteUser(user_id) {
            for (var u in valid_users) {
                var _user = valid_users[u];
                if (_user._id === user_id) {
                    valid_users.splice(u, 1);
                }
            }
        }

        function createUser(user){
            var total_existing_users = valid_users.length;
            var current_user_id = (total_existing_users+1)+''+(total_existing_users+2)+''+(total_existing_users+3);
            var user_new = {};
            user_new._id = current_user_id;
            user_new.firstName = user.firstName;
            user_new.lastName = user.lastName;
            user_new.username = user.username;
            user_new.password = user.password;
            valid_users.push(user_new);
            // console.log(valid_users);
            return current_user_id;
        }

        function findUserByUsername(user){
            for (var u in valid_users) {
                var _user = valid_users[u];
                if (_user.username === user.username) {
                    return _user;
                }
            }
        }
    }

})();