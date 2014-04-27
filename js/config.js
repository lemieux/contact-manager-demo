requirejs.config({
    hbs: {
        helpers: true,
        i18n: false,
        templateExtension: 'hbs',
        helperPathCallback: function(name) {
            return 'js/templates/helpers/' + name;
        },
        partialsUrl: 'js/templates/'
    },

    paths: {
        backbone: 'bower_components/backbone/backbone',
        'backbone.babysitter': 'bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'backbone.wreqr': 'bower_components/backbone.wreqr/lib/backbone.wreqr',
        'backbone-forms': 'js/libs/backbone-forms-marionette',
        'backbone-forms-templates': 'js/libs/backbone-forms-templates',
        'backbone-forms-list': 'bower_components/backbone-forms/distribution.amd/editors/list',
        marionette: 'bower_components/marionette/lib/core/amd/backbone.marionette',
        hbs: 'bower_components/require-handlebars-plugin/hbs',
        underscore: 'bower_components/underscore/underscore',
        jquery: 'bower_components/jquery/dist/jquery',
        modules: 'js/modules',
        templates: 'js/templates'
    }
});