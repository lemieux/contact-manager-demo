define([
    'underscore',
    'marionette',
    'modules/contact/views/contact/collection-item-view',
    'modules/contact/views/contact/collection-empty-view',
    'hbs!templates/contact/listing-template'
], function(
    _,
    Marionette,
    ContactItemView,
    ContactItemEmptyView,
    ListingTemplate
) {
    return Marionette.CompositeView.extend({
        template: ListingTemplate,
        itemView: ContactItemView,
        emptyView: ContactItemEmptyView,
        itemViewContainer: 'tbody',

        ui: {
            filterInput: 'input[data-search]'
        },

        triggers: {
            'click [data-action-add]': 'contact:add'
        },

        events: {
            'submit form': 'applyFilter'
        },

        getFilterValue: function() {
            return this.ui.filterInput.val();
        },

        applyFilter: function(e) {
            this._renderChildren();

            e.preventDefault();
        },

        onRender: function() {
            // the handler will be delayed by 200ms and by a maximum of 600ms
            var keydownHandler = _.debounce(_.bind(this.applyFilter, this), 200);

            this.ui.filterInput.on('keydown', keydownHandler);
        },

        addChildView: function(item, collection, options) {
            var filter = this.filter || Marionette.getOption(this, 'filter');
            if (filter && !filter(item)) {
                return;
            }
            this.closeEmptyView();
            var ItemView = this.getItemView();
            return this.addItemView(item, ItemView, options.index);
        },

        showCollection: function() {
            var filter = this.filter || Marionette.getOption(this, 'filter');
            var ItemView = this.getItemView();
            this.collection.each(function(item, index) {
                if (filter && !filter(item)) {
                    return;
                }
                this.addItemView(item, ItemView, index);
            }, this);
        },

        isEmpty: function(collection) {
            var filter = this.filter || Marionette.getOption(this, 'filter');

            if (!filter) {
                return collection.length === 0;
            }
            return collection.filter(filter).length === 0;
        },

        setFilter: function(filter) {
            this.filter = filter;
        }
    });
});