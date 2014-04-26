define([
    'marionette',
    'hbs!templates/contact/layout-template'
], function(
    Marionette,
    LayoutTemplate
) {
    return Marionette.Layout.extend({
        id: 'layout',
        template: LayoutTemplate,

        regions: {
            content: '.section-content',
            header: '.header'
        }
    });
});