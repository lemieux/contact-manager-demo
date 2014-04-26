define([
    'underscore',
    'backbone',
    'marionette',
    'modules/contact/views/contact/collection-view'
], function(
    _,
    Backbone,
    Marionette,
    CollectionView
) {
    return Marionette.Controller.extend({
        collectionView: CollectionView,

        getCollection: function() {
            return Marionette.getOption(this, 'collection');
        },

        buildCollectionView: function() {
            var collectionView = Marionette.getOption(this, 'collectionView');
            var view = new collectionView({
                collection: this.getCollection()
            });

            return view;
        },

        getView: function() {
            if (!this.view) {
                this.view = this.buildCollectionView();
                this.view.on('itemview:contact:delete', this.deleteMenu);
            }

            return this.view;
        },

        deleteMenu: function(childView, options) {
            var model = options.model;
            model.destroy();
        }
    });
});