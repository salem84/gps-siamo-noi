app.directive("banner", function() {
    return {
        restrict: "E",        // directive is an Element (not Attribute)
        scope: { // set up directive's isolated scope
            testo: "@"          // name var passed by value (string, one-way)
        },
        template: // replacement HTML (can use our scope vars here)
            "<div class='banner'>" +
                "  <span>{{testo}}</span>" +
                "</div>",
        replace: true,        // replace original markup with template
        transclude: false    // do not copy original HTML content
    
    };
});

app.directive("loadingWidget", function() {
    return {
        restrict: "A",
        compile: function(tElement, tAttrs) {
            var div = "<div id='loading-widget' style='display: none;' class='row-fluid ui-corner-all'>" +
                "<div class='loading-content'>" +
                "<p><img alt='Loading' src='images/ajax-loader.gif' width='100px' />" +
                "</p></div></div>";
            tElement.prepend(div);
        },
        //replace: true,
        //transclude: false
    };
});

app.directive("twitterAccount", function(UserInfo) {
    return {
        restrict: "E",
        //compile: function(tElement, tAttrs) {
        //    var div = "<a href='#'>Login account</a>";
        //    tElement.prepend(div);
        //},
        link: function(scope, element, attrs) {
            scope.$watch(function() {
                return UserInfo.isLogged;
            }, function() {
                update();
            });

            function update() {
                if (UserInfo.isLogged) {
                    scope.name = '@' + UserInfo.userName;
                    scope.url = '/#/auth/twitter/user';
                    
                } else {
                    scope.name = 'Login';
                    scope.url = '/#/auth/twitter';
                    
                }
            }
        },
        template:"<a href='{{url}}' class='navbar-brand'>{{name}}</a>",
        replace: true,
        transclude: true
    };
});