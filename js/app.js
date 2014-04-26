define([
    'marionette',
    'backbone',
    'modules/navigation/main',
    'modules/contact/main'
], function(
    Marionette,
    Backbone,
    NavigationModule,
    ContactModule
) {
    var App = new Marionette.Application();

    App.on("initialize:after", function(options) {
        Backbone.history.start({
            pushState: true
        });
    });

    App.module("Navigation", NavigationModule);
    App.module("Contact", ContactModule);

    App.addRegions({
        content: '#main-container'
    });

    return App;
});