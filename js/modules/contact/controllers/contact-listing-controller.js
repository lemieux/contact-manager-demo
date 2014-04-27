define([
    'underscore',
    'backbone',
    'marionette',
    'modules/contact/views/contact/collection-view',
    'modules/contact/models/contact-model'
], function(
    _,
    Backbone,
    Marionette,
    CollectionView,
    ContactModel
) {
    return Marionette.Controller.extend({
        filterAttributes: [
            'name',
            'title',
            'address',
            'phones',
            'email'
        ],

        collectionView: CollectionView,

        getCollection: function() {
            return Marionette.getOption(this, 'collection');
        },

        buildCollectionView: function() {
            var collectionView = Marionette.getOption(this, 'collectionView');
            var filter = Marionette.getOption(this, 'filterText');
            var view = new collectionView({
                collection: this.getCollection(),
                filter: _.bind(filter, this)
            });

            return view;
        },

        getView: function() {
            if (!this.view) {
                this.view = this.buildCollectionView();
                this.view.on('itemview:contact:delete', _.bind(this.deleteMenu, this));
                this.view.on('itemview:contact:add', _.bind(this.addMenu, this));
                this.view.on('contact:add', _.bind(this.addMenu, this));
            }

            return this.view;
        },

        deleteMenu: function(childView, options) {
            var model = options.model;
            model.destroy();
        },

        addMenu: function(childView, options) {
            // using the random function to generate a pk since the server won't in this application
            var id = _.random(0, 10000);
            var model = new ContactModel({
                id: id
            });
            this.getCollection().add(model);

            Backbone.history.navigate('/' + id + '/', {
                trigger: true
            });
        },

        getFilterValue: function() {
            return this.view.getFilterValue();
        },

        filterText: function(model) {
            var valid = true;

            var filterValue = this.getFilterValue();
            var filterAttributes = Marionette.getOption(this, 'filterAttributes');

            if (!_.isUndefined(filterValue) && filterValue.length > 0) {

                // normalize the text value
                var textFilterValue = filterValue.toLowerCase();

                if (!_.isEmpty(textFilterValue)) {
                    valid = false;

                    _.each(filterAttributes, function(attribute) {
                        if (model.has(attribute)) {
                            var rawValue = model.get(attribute);

                            var value = _.isArray(rawValue) ? rawValue.join('') : rawValue;
                            value = value.toLowerCase();

                            // check if the attribute contains the filter value
                            valid = value.indexOf(textFilterValue) !== -1;
                        }

                        if (valid) {
                            // the function needs to return false to stop the iteration
                            return false;
                        }
                    });
                }
            }

            return valid;
        }
    });
});