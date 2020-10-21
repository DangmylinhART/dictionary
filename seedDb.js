const mongoose = require('mongoose');
const Words = require('./routes/Words/models/Words')
const wordSeed = require('./wordSeed.json')
require('dotenv').config();

const seedFunc = async () => {
    try {
        const data = await Words.create(wordSeed);
        await console.log(`${data.length} records created`);
        await mongoose.disconnect();
        console.log(`MongoDB Disconnected`)
    } catch (err) {
        console.error(err);
        process.exist(1);
    }
};

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('MongoDB Connected');
        mongoose.connection.db.dropDatabase();
    })
    .then(() => {seedFunc();})
    .catch((err) => console.log(`MongoDB Error: ${err}`))