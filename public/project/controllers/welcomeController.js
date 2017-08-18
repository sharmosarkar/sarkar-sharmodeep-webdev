/**
 * Created by sharmo on 8/11/17.
 */



(function () {
    angular
        .module("musicHub")
        .controller("welcomeController", welcomeController);

    function welcomeController($location, userService, $rootScope){

        var model = this;


        // event handlers declarations
        model.login = login;
        model.signupUser = signupUser;


        console.log("Entered Here");
        // onload functions
        function init() {

        }
        init();



        // event handler definitions
        function login (user) {
            if(!user) {
                model.errorMessage = "User not found";
                return;
            }
            console.log(user);
            // user = userService.findUserByCredentials(user.username, user.password);
            var promise = userService.findUserByCredentials(user.username, user.password);
            promise
                .then(function (response) {
                    user = response.data;
                    console.log(user);
                    if(user.username === undefined ) {
                        model.errorMessage = "Wrong Username or Password";
                    } else {
                        $rootScope.user = user;
                        $rootScope.user.loggedStatus = "true";
                        console.log($rootScope.user);
                        if (user.username === 'admin'){
                            $location.url("/admin");
                        }
                        else{
                            $location.url("/profile");
                        }
                    }
                });
            removemodel();
        }

        function removemodel(){
            console.log('dd');
            $('.modal-backdrop').remove();
            document.body.className = document.body.className.replace("modal-open","modal-close");
        }


        function signupUser (user) {
            if (user.password === user.password_2){
                var promise = userService.findUserByUsername(user.username);
                promise
                    .then(function (response) {
                        console.log(response);
                        if(response.data.length === 0) {
                            userService
                                .createUser(user)
                                .then(function (response) {
                                    $rootScope.user = response.data;
                                    console.log(response.data);
                                    $rootScope.user.loggedStatus = "true";
                                    $location.url("/profile");
                                    removemodel();
                                })
                        } else {
                            model.error = "username already exists. please select another username.";
                            console.log(model.error);
                        }
                    });
            }
            else{
                model.passwordMismatch = 'Please Verify your password again. The two passwords don\'t match';
                console.log('Wrong');
            }

        }



    }

})();