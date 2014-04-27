define([
    'backbone',
    'hbs!templates/forms/form',
    'hbs!templates/forms/fieldset',
    'hbs!templates/forms/field',
    'hbs!templates/forms/nested-field',
    'hbs!templates/forms/list',
    'hbs!templates/forms/list-item',
    'hbs!templates/forms/list-nested-model',
    'backbone-forms',
    'backbone-forms-list'
], function(
    Backbone,
    FormTemplate,
    FieldsetTemplate,
    FieldTemplate,
    NestedFieldTemplate,
    ListTemplate,
    ListItemTemplate,
    ListNestedModelTemplate
) {
    var Form = Backbone.Form;

    Form.template = FormTemplate;
    Form.Fieldset.template = FieldsetTemplate;
    Form.Field.template = FieldTemplate;
    Form.NestedField.template = NestedFieldTemplate;

    Form.editors.Base.prototype.className = 'form-control';
    Form.Field.errorClassName = 'has-error';


    if (Form.editors.List) {
        Form.editors.List.template = ListTemplate;
        Form.editors.List.Item.template = ListItemTemplate;

        Form.editors.List.Object.template = Form.editors.List.NestedModel.template = ListNestedModelTemplate;
    }
});