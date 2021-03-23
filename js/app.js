'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),
            new Route('about', 'about.html'),
            new Route('contact', 'contact.html'),
            new Route('test', 'test.html'),
        ]);
    }
    init();
}());
