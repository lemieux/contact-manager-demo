define([
    'backbone',
    'modules/contact/models/contact-model'
], function(
    Backbone,
    ContactModel
) {
    return Backbone.Collection.extend({
        model: ContactModel,
        url: '/api/contacts/',
        comparator: 'name'
    });
});