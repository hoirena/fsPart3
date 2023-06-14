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
    number: {
        type: String,
        minLength: 8,
        required: true,
        trim: true,
        validate: {
            validator: function(phoneNumber) {
                return /^(\d{2}|\d{3})-\d+$/.test(phoneNumber)
            },
            message: props => `${props.value} does not fit proper phone number formate (00-00000... or 000-00000...)`
        }
    },
});
phonebookEntrySchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})
module.exports = mongoose.model('PhonebookEntry', phonebookEntrySchema);
