define([
    'backbone'
], function(
    Backbone
) {
    return Backbone.Model.extend({
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

            title: {
                type: 'Text'
            },

            address: {
                type: 'Text'
            },

            phones:  {
                type: 'List',
                itemType: 'Text'
            },

            email: {
                validators: ['required', 'email']
            },

            picture: {
                type: 'url'
            }
        }
    });
});