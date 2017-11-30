requirejs.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 'lib/jquery',
        bootstrap: 'lib/bootstrap',
        knockout: 'lib/knockout',
    }
})

define
requirejs(['lib/knockout', "posts"], function (ko, posts) {
    ko.applyBindings(posts.AppViewModel);
});