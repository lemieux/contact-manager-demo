define([
    'backbone'
], function(
    Backbone
) {
    return Backbone.RelationalModel.extend({
        urlRoot: '/api/contacts/',

        schema: {
            name: {
                type: 'Text',
                validators: [
                    'required',
                    function checkNameLength(value, formValues) {
                        if (value.length > 200) {
                            return {
                                type: 'name',
                                message: 'Must be less than 200 characters long.'
                            }
                        }
                    }
                ]
            },

            description: {
                type: 'Text'
            }
        }
    });
});