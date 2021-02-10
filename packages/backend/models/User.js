const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  siteRole: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  },
  memberOfProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  createdBugs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bug' }],
  assignedBugs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bug' }],
});

UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
