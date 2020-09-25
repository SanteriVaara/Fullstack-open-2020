/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
  },
});
personSchema.plugin(uniqueValidator, { message: 'name must be unique.' });

personSchema.set('toJSON', {
  transform: (returnedObject) => {
    delete returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
