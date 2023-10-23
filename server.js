const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const mongodb = process.env.mongodb

const client = new MongoClient(mongodb, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const app = express();
const PORT = 5000;

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

// Endpoint GET "/"
app.get('/genrelist', (req, res) => {
    res.send('Hanya diizinkan diakses dari IP tertentu.');
});

app.listen(PORT, () => {
    console.log(`Server Anime berjalan di http://localhost:${PORT}`);
});
