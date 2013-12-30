'use strict';

angular.module('gsn.services.user', []).
    factory('UserInfo', function() {
        var u = {
            isLogged: false,

            displayName: undefined,
            userName: undefined,
            
            disconnetti: function() {
                this.isLogged = false;
                this.displayName = '';
                this.userName = '';
            },

            parseUser: function(tu) {
                if (tu) {
                    this.isLogged = true;
                    this.displayName = tu.name;
                    this.userName = tu.screen_name;
                }
            }
        };

        return u;
    });
