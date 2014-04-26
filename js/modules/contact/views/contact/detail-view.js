define([
    'jquery',
    'marionette',
    'hbs!templates/contact/contact/detail-template'
], function(
    $,
    Marionette,
    ContactDetailTemplate
) {
    return Marionette.Layout.extend({
        template: ContactDetailTemplate,
        className: 'row form-wrapper',

        regions: {
            name: '[data-region-name]',
            description: '[data-region-description]'
        },

        ui: {
            saveButton: 'button[data-action-save]',
            nameGroup: '[data-ui-name-group]',
            descriptionGroup: '[data-ui-description-group]'
        },

        triggers: {
            'click @ui.saveButton': 'contact:save'
        },

        getFieldElement: function(fieldName) {
            return this.ui[fieldName + 'Group'];
        },

        setFieldError: function(fieldName, errorMessage) {
            var element = this.getFieldElement(fieldName);

            element.addClass('has-error');
            if (element.find('[data-ui-error]').length === 0) {
                var errorElement = $('<span />', {
                    class: 'help-block',
                    text: errorMessage,
                    'data-ui-error': ''
                });

                element.append(errorElement);
            }
        },

        unsetFieldError: function(fieldName) {
            var element = this.getFieldElement(fieldName);

            element.removeClass('has-error');
            element.find('[data-ui-error]').remove();
        },

        setNameFieldError: function(errorMessage) {
            this.setFieldError('name', errorMessage);
        },

        unsetNameFieldError: function() {
            this.unsetFieldError('name');
        },

        setDescriptionFieldError: function(errorMessage) {
            this.setFieldError('description', errorMessage);
        },

        unsetDescriptionFieldError: function() {
            this.unsetFieldError('description');
        }
    });
});