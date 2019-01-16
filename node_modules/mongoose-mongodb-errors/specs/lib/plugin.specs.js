var _                     = require('lodash');
var Q                     = require('q');
var chai                  = require('chai');
var mongoose              = require('mongoose');
var mongodbErrorConverter = require('../../lib/plugin');

mongoose.plugin(mongodbErrorConverter);

var UserSchema = new mongoose.Schema({
    'username': String,
    'email': {
        'type': String,
        'unique': true
    }
});

var UserModel = mongoose.model('User', UserSchema);

describe('mongoose-mongodb-errors', function () {

    it('adds a "post error" handler called "mongodbErrorHandler"', function () {
        Array.isArray(UserSchema.s.hooks._posts['save:error']).should.be.true;
        UserSchema.s.hooks._posts['save:error'][0].name.should.eql('mongodbErrorHandler');
    });

    it('transforms a MongoError duplicate key error into a validation like error', function () {

        var docs = [
            { username: 'user1', email: 'user1@user1.com' },
            { username: 'user2', email: 'user1@user1.com' }
        ];

        return Q
                .ninvoke(UserModel, 'create', docs)
                .then(expectError('One of the fields is duplicated. It should have thrown an error.'))
                .catch(function (err) {
                    err.name.should.eql('ValidationError');
                    chai.expect(err.errors['email']).to.not.be.undefined;
                    err.errors.email.value.should.eql('user1@user1.com');
                });
    });

});


function expectError(message) {
    return function () {
        throw new Error('An error was expected. Hint: ' + message);
    };
}