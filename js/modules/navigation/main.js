define([
    'underscore',
    'backbone',
    'marionette',
    'jquery'
], function(
    _,
    Backbone,
    Marionette,
    $
) {
    return Marionette.Module.extend({
        startWithParent: true,

        initialize: function() {
            _.bindAll(this);
        },

        onStart: function() {
            this.catchLinks();
        },

        onClick: function(event) {
            var href = $(event.currentTarget).attr('href');
            event.preventDefault();
            Backbone.history.navigate(href, {
                trigger: true
            });

            return false;
        },

        catchLinks: function() {
            $(document).on('click', 'a[href^="/"]', this.onClick);
        }

    });
});