define([
    'marionette',
    'hbs!templates/contact/contact/detail-template'
], function(
    Marionette,
    ContactDetailTemplate
) {
    return Marionette.Layout.extend({
        template: ContactDetailTemplate,
        className: 'row',

        regions: {
            name: '[data-region-name]',
            title: '[data-region-title]',
            address: '[data-region-address]',
            phones: '[data-region-phones]',
            email: '[data-region-email]',
            picture: '[data-region-picture]'
        },

        ui: {
            saveButton: 'button[data-action-save]',
            nameGroup: '[data-ui-name-group]',
            titleGroup: '[data-ui-title-group]',
            addressGroup: '[data-ui-address-group]',
            phonesGroup: '[data-ui-phones-group]',
            emailGroup: '[data-ui-email-group]',
            pictureGroup: '[data-ui-picture-group]'
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

        setTitleFieldError: function(errorMessage) {
            this.setFieldError('title', errorMessage);
        },

        unsetTitleFieldError: function() {
            this.unsetFieldError('title');
        },

        setAddressFieldError: function(errorMessage) {
            this.setFieldError('address', errorMessage);
        },

        unsetAddressFieldError: function() {
            this.unsetFieldError('address');
        },

        setPhonesFieldError: function(errorMessage) {
            this.setFieldError('phones', errorMessage);
        },

        unsetPhonesFieldError: function() {
            this.unsetFieldError('phones');
        },

        setEmailFieldError: function(errorMessage) {
            this.setFieldError('email', errorMessage);
        },

        unsetEmailFieldError: function() {
            this.unsetFieldError('email');
        },

        setPictureFieldError: function(errorMessage) {
            this.setFieldError('picture', errorMessage);
        },

        unsetPictureFieldError: function() {
            this.unsetFieldError('picture');
        }
    });
});