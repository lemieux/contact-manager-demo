define([
    'underscore',
    'backbone',
    'marionette',
    'modules/contact/views/layout-view',
    'modules/contact/controllers/contact-detail-controller',
    'modules/contact/controllers/contact-listing-controller',
    'modules/contact/views/header-view',
    'modules/contact/collections/contact-collection'
], function(
    _,
    Backbone,
    Marionette,
    LayoutView,
    ContactDetailController,
    ContactListingView,
    HeaderView,
    ContactCollection
) {
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'showListing',
            ':id/': 'showContactDetails'
        }
    });

    return Marionette.Module.extend({
        startWithParent: true,

        initialize: function() {
            this.contactCollection = new ContactCollection();

            // Initializes a callback to know when the collection is filled.
            this.contactCollectionFetchCallbacks = new Marionette.Callbacks();

            this.layout = new LayoutView();
        },

        /**
         * Show the contact list
         */
        showListing: function() {
            this.contactCollectionFetchCallbacks.add(function() {
                this.app.content.show(this.layout);


                var controller = new ContactListingView({
                    collection: this.contactCollection
                });

                this.layout.content.show(controller.getView());

                this.layout.header.show(new HeaderView({
                    text: 'Contacts'
                }));
            }, this);
        },

        /**
         * Shows the contact details
         */
        showContactDetails: function(id) {

            // If when arrived on the contact details page at first,
            // the collection might not be initialized.
            // This part might be optimized to use only the contact
            // instead of fetching the whole collection
            this.contactCollectionFetchCallbacks.add(function() {
                var model = this.contactCollection.get(id);

                var controller = new ContactDetailController({
                    model: model
                });

                this.app.content.show(this.layout);

                this.layout.content.show(controller.getView());

                this.layout.header.show(new HeaderView({
                    text: model.get('name')
                }));
            }, this);
        },

        onStart: function() {
            new Router({
                controller: this
            });

            this.contactCollection.fetch({
                success: _.bind(function() {
                    this.contactCollectionFetchCallbacks.run();
                }, this)
            });
        }
    });
});