'use strict';

//const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const parseLocation = () => location.hash.slice(1).toLowerCase();

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        var r = this.routes;
        (function (scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function (scope, r) {

        var path = parseLocation();

        if (path.length > 0) {
            var found = r.includes(path);
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.name === path) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function (scope) {
            var url = 'views/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};
