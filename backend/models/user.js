const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /^https?:\/\/[www.]?[a-z0-9\D]{1,}\.[ru|net][a-z\D]{0,}#?/gi.test(v),
      message: 'Некорректный адрес адреса аватара',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный формат переданного email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  if (email && password) {
    return this.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }

        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new Error('Неправильные почта или пароль'));
            }

            return user;
          });
      });
  }

  return Promise.reject(new Error('Пароль или email не могут быть пустыми'));
};

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.toJSON = toJSON;

module.exports = mongoose.model('user', userSchema);
