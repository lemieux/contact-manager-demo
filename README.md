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


Since there is no backend, grunt-connect is rewriting routes to the API to static JSON files. Note that calls to individuals contacts are not working since I did not create JSON files for each contacts, but those endpoints should return the representation of only one contact in a real app.

The listing works but every other calls (create, delete, etc.) are failing. The application works anyway but there will be errors in the console when doing those actions. Routes to contact details were also rewritten to access them directly from the url (i.e. `http://localhost:8080/1/`).



Implemented features
--------------------

- List contacts
- View/edit contact details
- Filter contacts with a text input

Addtional feature
-----------------

- Image editor (designed below, but not implemented)


Missing things
--------------

- Mocha/CasperJS tests
- UI customizations

Things that could be improved
-----------------------------

- Contacts are fetched when the page is loaded instead of being bootstrapped directly in the page. This creates a delay.
- A new contact can have required field empty if you click on `Back to listing`. This could be avoided by checking if the contact is new and deleting it if nothing was modified.
- Form validation could be a lot nicer. Error messages are not very friendly.


Librairies used
---------------

- Backbone
- Marionette
- Underscore
- jQuery
- Backbone-forms (modified to use Marionette's ItemView instead of raw View)
- Handlebars
- almond.js
- Grunt (+ couple of plugins to do dev server and building the app)


Design - Contacts
-----------------

REST Endpoints:
- /api/contacts/ => `GET` : List all contacts, `POST`: create a new contact (backend would determine the id of the new contact)
- /api/contacts/:id/ => `GET` : Get one contact, `PUT` : Update one contact, `DELETE` : Delete one contact

Contact JSON example :

```
{
    "id": 1,
    "name": "John Doe",
    "title": "Useful employee", // job title
    "address": "1 some Street, Montreal",
    "phones": [ // phone numbers
        "514-888-8888"
    ],
    "email": "someone@somewhere.com",
    "picture": "http://www.catster.com/files/original.jpg"
}
```

With the time constraints, the picture is only an URL, but it should normally be a picture uploaded then linked to the contact.


Design - Image editor
---------------------

The image editor would be used to edit the picture of a contact, allowing the user to crop and rotate the picture. The editor would be in a modal that would appear when the picture is clicked in the contact detail window. To manage the interaction with the picture, I would use Fabric.js to create a canvas and do all the manipulation in there. The modal would contains a canvas and a button bar with two rotation buttons (+90, -90) and a button to activate the crop.

A picture would need a JSON representation of its own :

```
{
    "id": 1,
    "path": "/img/picture.jpg", // path of the original picture (used in the image editor)
    "thumbnail_path": "/img/thumbnails/picture.jpg", // path of the transformed picture (used in the detail page)
    "width": "200", // original width
    "height": "400", // original height
    "crop_x": 0, // crop X coordinate
    "crop_y": 0, // crop Y coordinate
    "crop_width": 100, // crop width
    "crop_height": 200, // crop height
    "angle": 270 // rotation angle (always between 0 and 359)
}
```


REST Endpoints:
- /api/pictures/ => `GET` : List all pictures
- /api/pictures/:id/ => `GET` : Get one picture, `PUT` : Update one picture, `DELETE` : Delete one picture

When updating a picture, if the crop coordinates or the rotation angle changed, the server must apply those modifications and return the new thumbnail. This should be done asynchronously in the backend and would need a polling system in the frontend to know when the thumbnail is ready. This part is a fairly complex one and would not fit in the 48h constraint.
