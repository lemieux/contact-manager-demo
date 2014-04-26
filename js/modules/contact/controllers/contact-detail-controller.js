define([
    'underscore',
    'backbone',
    'marionette',
    'modules/contact/views/contact/detail-view'
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

                this.descriptionField = new Backbone.Form.editors.Text({
                    model: this.getModel(),
                    key: 'description',
                    schema: this.getModel().schema.description
                });


                this.view.on('show', _.bind(function() {
                    this.view.name.show(this.nameField);
                    this.view.description.show(this.descriptionField);
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

            var descriptionError = this.descriptionField.commit();

            if (descriptionError) {
                this.view.setDescriptionFieldError(descriptionError.message);
                hasErrors = true;
            } else {
                this.view.unsetDescriptionFieldError();
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