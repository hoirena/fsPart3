const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.h7dd4mr.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phonebookEntrySchema = new mongoose.Schema({
    name: String,
    number: String,
});
const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema);

if (process.argv.length < 5) {
    let phonebookEntries = [];
    PhonebookEntry.find({}).then(result => {
        result.forEach(entry => phonebookEntries.push(entry));
        console.log(`phonebook:`);
        phonebookEntries.map(phEntry => console.log(phEntry.name, phEntry.number));
        mongoose.connection.close();
    });
} else {
    const name = process.argv[3];
    const number = process.argv[4];
    const newEntry = new PhonebookEntry({
        name: name,
        number: number,
    });
    newEntry.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    })
}
