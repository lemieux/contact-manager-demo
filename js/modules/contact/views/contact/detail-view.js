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

        /**
         * Get the element from the UI object
         * @param  {String} fieldName
         * @return {jQuery Object}
         */
        getFieldElement: function(fieldName) {
            return this.ui[fieldName + 'Group'];
        },

        /**
         * Sets a field in error state
         * @param {String} fieldName
         * @param {String} errorMessage
         */
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

        /**
         * Remove the error state from a field
         * @param  {String} fieldName
         */
        unsetFieldError: function(fieldName) {
            var element = this.getFieldElement(fieldName);

            element.removeClass('has-error');
            element.find('[data-ui-error]').remove();
        },

        /*
         *   The following methods are helpers for each fields of the form
         */


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