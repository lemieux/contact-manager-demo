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

        /**
         * Get the text filter value
         * @return {String}
         */
        getFilterValue: function() {
            return this.ui.filterInput.val();
        },

        /**
         * Event handler that apply the filter to the collection view
         * @param  {Event} e
         */
        applyFilter: function(e) {
            // Calls the internal function that will re-render the collection part
            // of this composite view.
            //
            // The filter is applied when the collection is rendered.
            this._renderChildren();

            e.preventDefault();
        },

        onRender: function() {
            // the handler will be delayed by 200ms
            var keydownHandler = _.debounce(_.bind(this.applyFilter, this), 200);

            this.ui.filterInput.on('keydown', keydownHandler);
        },

        /**
         * Add a new view to the collection view
         * @param {Model} item
         * @param {Collection} collection
         * @param {Object} options
         *
         * This is taken from Marionette's source and modified to use the filter.
         */
        addChildView: function(item, collection, options) {
            var filter = this.filter || Marionette.getOption(this, 'filter');

            // Rejects the item if a filter is present and item doesn't pass the filter
            if (filter && !filter(item)) {
                return;
            }

            this.closeEmptyView();
            var ItemView = this.getItemView();
            return this.addItemView(item, ItemView, options.index);
        },

        /**
         * Render the collection
         *
         * This is taken from Marionette's source and modified to use the filter.
         */
        showCollection: function() {
            var filter = this.filter || Marionette.getOption(this, 'filter');
            var ItemView = this.getItemView();
            this.collection.each(function(item, index) {

                // Rejects the item if a filter is present and item doesn't pass the filter
                if (filter && !filter(item)) {
                    return;
                }
                this.addItemView(item, ItemView, index);
            }, this);
        },

        /**
         * Evaluates if the collection is empty
         * @param  {Collection}  collection
         * @return {Boolean}
         */
        isEmpty: function(collection) {
            var filter = this.filter || Marionette.getOption(this, 'filter');

            // If a filter is active, the collection is filtered first.
            return (filter ? collection.filter(filter) : collection).length === 0;
        }
    });
});