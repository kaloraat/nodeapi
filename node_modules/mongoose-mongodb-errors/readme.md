# Mongoose-MongoDB-Errors

A plugin to transform mongodb like errors (E.G. "11000 - duplicate key") into Mongoose ValidationError instances.
This plugin takes advantage of the recently introduced [Error Handling Middlewares](http://thecodebarbarian.com/mongoose-error-handling.html) on
mongoose 4.5.

So, unfortunately you must be using the latest mongoose to use this plugin.


## Usage Examples

`npm install mongoose-mongodb-errors --save`

    var mongoose            = require('mongoose');
    var mongodbErrorHandler = require('mongoose-mongodb-errors')

    // Either add the plugin globally (before your schemas are loaded)

    mongoose.plugin(mongodbErrorHandler);

    // Or add it directly into the desired schemas

    var UserSchema = new mongoose.Schema({ username: { type: String, unique: true }});

    UserSchema.plugin(mongodbErrorHandler);

## Current Status

Right now only one transformation is fully supported, which is the most common duplicate key (index) error, it will conventionally be transformed into `ValidationError`. It successfully identify the failing path (or field) and value correctly, and add them into the errors hash.

## Contributing and running the tests

The current implementation is really clumsy and in serious need of refactoring if more specific transformation are to be added.

Help is always welcome! To run the test suite just `npm test` or `mocha --recursive specs/` is enough, after installing the dependencies.
