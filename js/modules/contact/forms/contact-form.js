define([
    'backbone',
    'modules/contact/models/contact-model'
], function(
    Backbone,
    Contact
) {
    return Backbone.Form.extend({
        model: Contact
    })
});