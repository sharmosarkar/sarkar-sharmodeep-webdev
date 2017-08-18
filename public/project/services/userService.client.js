/**
 * Created by sharmo on 8/11/17.
 */


(function () {

    angular
        .module("musicHub")
        .factory("userService", userService);
    
    
    function userService($http, $q) {

        var api =  {

            'findUserByCredentials' : findUserByCredentials,
            'findUserById' : findUserById,
            'updateUser' : updateUser,
            'deleteUser': deleteUser,
            'createUser':createUser,
            'findUserByUsername': findUserByUsername,
            'findByFirstName' : findByFirstName,
            'findByLastName' : findByLastName,
            'findById_array' : findById_array,
            'getAllUsers' : getAllUsers,
            'getUserNames_array' : getUserNames_array
        };
        return api;

        function getUserNames_array(objs) {
            //return function (artists) {
            //     console.log(artists);
            var promises = objs.map(function (obj) {

                var deffered = $q.defer();

                findUserById(obj.userId).then(function (data) {
                    deffered.resolve(data);
                }, function (error) {
                    deffered.reject(error);
                })

                return deffered.promise;

            })

            return $q.all(promises);
            //}
        }

        function getAllUsers() {
            var url = "/api/musichub/user/all";
            return $http.get(url);
        }
        
        function findUserByUsername(username) {
            var url = "/api/musichub/user/username?username="+username;
            return $http.get(url);
        }
        
        function createUser(user) {
            console.log(user);
            var url = "/api/musichub/user/createuser";
            var response = $http.post(url, user);
            return response;
        }

        function deleteUser(user_id) {
            var url = "/api/musichub/user/" + user_id;
            return $http.delete(url);
        }

        function updateUser(user_id, user) {
            var url = "/api/musichub/user/" + user_id;
            return $http.put(url, user);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/musichub/user/credentials?username="+username+"&password="+password);
        }

        function findUserById(userId){
            return $http.get("/api/musichub/user/"+userId);
        }

        function findByLastName(username) {
            var url = "/api/musichub/user/lastName?username="+username;
            return $http.get(url);
        }

        function findByFirstName(username) {
            var url = "/api/musichub/user/firstName?username="+username;
            return $http.get(url);
        }

        function findById_array(userIds) {
            console.log(userIds);
            var promises = userIds.map(function (userId) {
                var deffered = $q.defer();
                findUserById(userId)
                    .then(function (data) {
                    deffered.resolve(data);
                }, function (error) {
                    deffered.reject(error);
                });
                return deffered.promise;
            });
            return $q.all(promises);
        }
    }

})();