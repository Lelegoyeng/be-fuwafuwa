const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.mongodb;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToMongo = async () => {
    if (!client.connect()) {
        await client.connect();
    }
    return client.db("fuwafuwa");
};


module.exports = connectToMongo;