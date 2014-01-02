'use strict';

angular.module('gsn.services.user', ['gsn.services.rest']).
    factory('Auth', function($cookieStore, $http) {
        var currentUser = $cookieStore.get('user');

        //$cookieStore.remove('user');

        function changeUser(user) {
            _.extend(currentUser, user);
        };     


        return {
            //Verifica se l'utente passato è collegato, se è undefined vedo se c'è un utente collegato
            isLoggedIn: function(user) {
                if (user === undefined) {
                    user = currentUser;
                }
                return (user !== undefined && user.username !== '' && user.username !== '');
            },

            logout: function() {
                $http.post('/api/auth/logout').success(function() {
                    //changeUser({
                    //    username: '',
                    //    displayName: ''
                    //});
                    currentUser = undefined;
                    //success();
                });//.error(error);
            },

            user: currentUser,

            //parseUser: function(twitter_user) {
            //    if (twitter_user) {
            //        this.isLogged = true;
            //        this.displayName = twitter_user.name;
            //        this.userName = twitter_user.screen_name;
            //    }
            //}
        };

    });
