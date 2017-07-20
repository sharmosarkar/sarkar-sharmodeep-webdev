/**
 * Created by Sharmo on 7/19/2017.
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

    function userService() {

        // data in service
        var valid_users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api =  {

            'findUserByUsernameAndPassword' : findUserByUsernameAndPassword
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
        }

        function findUserByUsernameAndPassword(username, password) {

            for (var u in valid_users) {
                var _user = valid_users[u];
                if (_user.username === username && _user.password === password) {
                    return _user;
                }
            }
            return null;
       }
    }


})();
