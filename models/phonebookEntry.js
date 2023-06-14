const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI
console.log('connecting to db; url:', url);
mongoose.connect(url)
    .then(result => {
        console.log('connceted to db');
    })
    .catch(err => console.log('error connecting to db:', err.message));

const phonebookEntrySchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        trim: true,
    },
    number: String,
});
phonebookEntrySchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})
module.exports = mongoose.model('PhonebookEntry', phonebookEntrySchema);
