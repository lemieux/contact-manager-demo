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

        initialize: function(options) {
            _.bindAll(this, 'template');
            this.text = options.text;
        },

        template: function() {
            return this.text;
        }
    });
});