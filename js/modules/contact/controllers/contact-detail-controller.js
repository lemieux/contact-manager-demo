define([
    'underscore',
    'backbone',
    'marionette',
    'modules/contact/views/contact/detail-view',
    'backbone-forms',
    'backbone-forms-list',
    'backbone-forms-templates'
], function(
    _,
    Backbone,
    Marionette,
    DetailView
) {
    return Marionette.Controller.extend({
        detailView: DetailView,

        getModel: function() {
            return Marionette.getOption(this, 'model');
        },

        buildDetailView: function() {
            var detailView = Marionette.getOption(this, 'detailView');

            var view = new detailView({
                model: this.getModel()
            });

            return view;
        },

        getView: function() {
            if (!this.view) {
                this.view = this.buildDetailView();

                this.view.on('contact:save', _.bind(this.saveContact, this));

                this.nameField = new Backbone.Form.editors.Text({
                    model: this.getModel(),
                    key: 'name',
                    schema: this.getModel().schema.name
                });

                this.titleField = new Backbone.Form.editors.Text({
                    model: this.getModel(),
                    key: 'title',
                    schema: this.getModel().schema.title
                });

                this.addressField = new Backbone.Form.editors.Text({
                    model: this.getModel(),
                    key: 'address',
                    schema: this.getModel().schema.address
                });

                this.phonesField = new Backbone.Form.editors.Text({
                    model: this.getModel(),
                    key: 'phones',
                    schema: this.getModel().schema.phones
                });

                this.emailField = new Backbone.Form.editors.Text({
                    model: this.getModel(),
                    key: 'email',
                    schema: this.getModel().schema.email
                });

                this.pictureField = new Backbone.Form.editors.Text({
                    model: this.getModel(),
                    key: 'picture',
                    schema: this.getModel().schema.picture
                });


                this.view.on('show', _.bind(function() {
                    this.view.name.show(this.nameField);
                    this.view.title.show(this.titleField);
                    this.view.address.show(this.addressField);
                    this.view.phones.show(this.phonesField);
                    this.view.email.show(this.emailField);
                    this.view.picture.show(this.pictureField);
                }, this));
            }

            return this.view;
        },

        saveContact: function() {
            var hasErrors = false;
            var nameError = this.nameField.commit();

            if (nameError) {
                this.view.setNameFieldError(nameError.message);
                hasErrors = true;
            } else {
                this.view.unsetNameFieldError();
            }

            var titleError = this.titleField.commit();

            if (titleError) {
                this.view.setTitleFieldError(titleError.message);
                hasErrors = true;
            } else {
                this.view.unsetTitleFieldError();
            }

            var addressError = this.addressField.commit();

            if (addressError) {
                this.view.setAddressFieldError(addressError.message);
                hasErrors = true;
            } else {
                this.view.unsetAddressFieldError();
            }

            var phonesError = this.phonesField.commit();

            if (phonesError) {
                this.view.setPhonesFieldError(phonesError.message);
                hasErrors = true;
            } else {
                this.view.unsetPhonesFieldError();
            }

            var emailError = this.emailField.commit();

            if (emailError) {
                this.view.setEmailFieldError(emailError.message);
                hasErrors = true;
            } else {
                this.view.unsetEmailFieldError();
            }

            var pictureError = this.pictureField.commit();

            if (pictureError) {
                this.view.setPictureFieldError(pictureError.message);
                hasErrors = true;
            } else {
                this.view.unsetPictureFieldError();
            }

            if (!hasErrors) {
                this.getModel().save();
                Backbone.history.navigate("/", {
                    trigger: true
                })
            }
        }
    });
});