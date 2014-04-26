define([
    'backbone',
    'modules/contact/models/contact-model'
], function(
    Backbone,
    MenuModel
) {
    return Backbone.Collection.extend({
        model: MenuModel,
        url: '/api/contacts/',
        comparator: 'name'
    });
});