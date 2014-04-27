Contact manager
===============

This application is a demo of a single page app to manage contacts.

Instructions to run the app
---------------------------

```
$ bower install
$ npm install
$ grunt dev
```
The application should be avaiable at `http://localhost:8080`.


Since there is no backend, grunt-connect is rewriting routes to the api to static json files. The listing works but every other calls (create, delete, etc.) are failing. The application works anyway but there will be errors in the console when doing those actions. Routes to contact details were also rewritten to access them directly from the url (i.e. `http://localhost:8080/1/`).


Implemented features:

- List contacts
- View/edit contact details
- Filter contacts with a text input


Missing things:

- Mocha/CasperJS tests


Librairies used:

- Backbone
- Marionette
- Underscore
- jQuery
- Backbone-forms (modified to use Marionette's ItemView instead of raw View)
- almond.js
- Grunt (+ couple of plugins to do dev server and building the app)
