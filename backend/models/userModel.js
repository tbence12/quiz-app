import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {timestamps:true})

UserSchema.pre('save', function(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, function(error, salt) {
      if(error) {
        console.log('Error during salt generation');
        return next(error);
      }
      bcrypt.hash(user.password, salt, function(error, hash) {
        if(error) {
          console.log('Error during hash');
          return next(error);
        }
        user.password = hash;
        return next();
      })
    })
  } else {
    return next();
  }
})

UserSchema.methods.comparePasswords = function(password, next) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    next(error, isMatch);
  })
}

const defaultUsers = [
  { email: 'e@mail.1', username: 'user1', password: 'pass1', year: 2000 },
  { email: 'e@mail.2', username: 'user2', password: 'pass2', role: 2002 },
  { email: 'ad@mail.1', username: 'admin1', password: 'pass1', role: 1995, isAdmin: true }
];

const UserModel = mongoose.model('User', UserSchema);

UserModel.countDocuments().then(count => {
  console.log('User count: ', count);
  if (count === 0) {
    User.insertMany(defaultUsers).then(() => {
      console.log('Default users created');
    }).catch(error => {
      console.error('Error creating default users', error);
    });
  }
}).catch(error => {
  console.error('Error checking user count', error);
});

export default UserModel;
