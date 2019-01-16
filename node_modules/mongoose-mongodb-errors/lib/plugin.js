var mongoose = require('mongoose');

/*
 * Adds error handling middlewares into a given schema.
 */
function ProcessMongoDBErrors(schema) {
    schema.post('save', mongodbErrorHandler);
    schema.post('update', mongodbErrorHandler);
    schema.post('findOneAndUpdate', mongodbErrorHandler);
    schema.post('insertMany', mongodbErrorHandler);
}


function mongodbErrorHandler (err, doc, next) {
    if (err.name !== 'MongoError' || err.code != 11000) {
        return next(err);
    }

    var path = err.message.match(/\$([\w]*)_\d/)[1];
    var value = err.message.match(/\{\s:\s\"?([^\"\s]+)/)[1];

    var validationError = new mongoose.Error.ValidationError();
    validationError.errors[path] = validationError.errors[path] || {};
    validationError.errors[path].kind = 'duplicate';
    validationError.errors[path].value = value;
    validationError.errors[path].path = path;
    validationError.errors[path].message = '{0} is expected to be unique.'.replace('{0}', path);
    validationError.errors[path].reason = err.message;
    validationError.errors[path].name = err.name;

    next(validationError);

}

module.exports = ProcessMongoDBErrors;
