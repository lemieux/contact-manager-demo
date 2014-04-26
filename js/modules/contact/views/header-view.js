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
        tagName: 'h3',

        initialize: function(options) {
            _.bindAll(this);
            this.text = options.text;
        },

        template: function() {
            return this.text;
        }
    });
});