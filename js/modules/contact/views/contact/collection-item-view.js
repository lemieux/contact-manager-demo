define([
    'marionette',
    'hbs!templates/contact/contact/collection-item-template'
], function(
    Marionette,
    ContactItemTemplate
) {
    return Marionette.ItemView.extend({
        tagName: 'tr',
        template: ContactItemTemplate,

        triggers: {
            'click [data-action-delete]': 'contact:delete'
        }
    });
});