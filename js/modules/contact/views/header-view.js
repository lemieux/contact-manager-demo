define([
    'underscore',
    'marionette',
    'hbs!templates/contact/layout-template'
], function(
    _,
    Marionette,
    LayoutTemplate
) {
    return Marionette.ItemView.extend({
        tagName: 'h1',

        className: 'page-header',

        template: function() {
            return Marionette.getOption(this, 'text');
        }
    });
});