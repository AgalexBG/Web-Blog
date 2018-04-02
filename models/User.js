const mongoose = require('mongoose');
const encryption = require('./../utilities/encryption');

let userSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        fullName: {type: String, required: true},
        articles:{type:[mongoose.Schema.ObjectId], default: []},
    }
);

/*userSchema.method ({
   authenticate: function (password) {
       let inputPasswordHash = encryption.hashPassword(password, this.salt);
       let isSamePasswordHash = inputPasswordHash === this.passwordHash;

       return isSamePasswordHash;
   }
});*/

userSchema.method ({
   authenticate: function (password) {
       let inputPassword = encryption.Password(password, this.salt);
       let isSamePassword = inputPassword === this.password;
        console.log('vatre');
       return isSamePassword;
   }
});

const User = mongoose.model('User', userSchema);

module.exports = User;



