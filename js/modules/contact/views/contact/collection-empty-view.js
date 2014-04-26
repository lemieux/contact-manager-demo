define([
    'marionette',
    'hbs!templates/contact/contact/collection-empty-template'
], function(
    Marionette,
    ContactItemEmptyTemplate
) {
    return Marionette.ItemView.extend({
        template: ContactItemEmptyTemplate
    });
});