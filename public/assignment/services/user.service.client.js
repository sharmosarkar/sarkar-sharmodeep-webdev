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
            // for (var u in valid_users) {
            //     var _user = valid_users[u];
            //     if (_user._id === userId) {
            //         return _user;
            //     }
            // }
            // return null;
            var response = $http.get("/api/users/"+userId);
            // console.log(response);
            return response;
        }

        function findUserByCredentials(username, password) {
            // for (var u in valid_users) {
            //     var _user = valid_users[u];
            //     if (_user.username === username && _user.password === password) {
            //         return _user;
            //     }
            // }
            // return null;

            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(user_id, user) {
            // for (var u in valid_users) {
            //     var _user = valid_users[u];
            //     if (_user._id === user_id) {
            //         _user.username = user.username;
            //         _user.firstName = user.firstName;
            //         _user.lastName = user.lastName;
            //        return "Updated";
            //     }
            // }
            // return "Couldn't Find User";

            var url = "/api/user/" + user_id;
            return $http.put(url, user);
            // return response;
        }

        function deleteUser(user_id) {
            // for (var u in valid_users) {
            //     var _user = valid_users[u];
            //     if (_user._id === user_id) {
            //         valid_users.splice(u, 1);
            //     }
            // }
            var url = "/api/user/" + user_id;
            return $http.delete(url);
        }

        function createUser(user){
            // var total_existing_users = valid_users.length;
            // var current_user_id = (total_existing_users+1)+''+(total_existing_users+2)+''+(total_existing_users+3);
            // var user_new = {};
            // user_new._id = current_user_id;
            // user_new.firstName = user.firstName;
            // user_new.lastName = user.lastName;
            // user_new.username = user.username;
            // user_new.password = user.password;
            // // valid_users.push(user_new);
            // // // console.log(valid_users);
            // // return current_user_id;
            //
            // var url = '/api/user/';
            // var response = $http.post(url, user_new);
            // console.log(response.data);
            // return response.data;
            var url = "/api/user";
            var response = $http.post(url, user);
            return response;
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }


    }

})();