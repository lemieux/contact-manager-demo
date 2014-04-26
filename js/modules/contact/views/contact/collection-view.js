define([
    'marionette',
    'modules/contact/views/contact/collection-item-view',
    'modules/contact/views/contact/collection-empty-view',
    'hbs!templates/contact/listing-template'
], function(
    Marionette,
    ContactItemView,
    ContactItemEmptyView,
    ListingTemplate
) {
    return Marionette.CompositeView.extend({
        template: ListingTemplate,
        itemView: ContactItemView,
        emptyView: ContactItemEmptyView,
        itemViewContainer: 'tbody'
    });
});