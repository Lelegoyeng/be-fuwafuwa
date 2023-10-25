const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config()

const uri = process.env.mongodb
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("fuwafuwa");
        const collection = database.collection("genrelist");

        const result = await collection.find({}).toArray();
        res.json(result);
    } finally {
        await client.close();
    }
});

router.post('/', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("fuwafuwa");
        const collection = database.collection("genrelist");

        const get = await collection.find({}).toArray();
        const genreId_Increment = Math.max(...get.map(value => value.genre_id));
        const newGenre = {
            nama: req.body.nama,
            genre_id: genreId_Increment + 1
        }

        const result = await collection.insertOne(newGenre);
        res.json(result);
    } finally {
        await client.close();
    }
});

router.put('/:id', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("fuwafuwa");
        const collection = database.collection("genrelist");

        const genreId = req.params.id;
        const updatedGenre = req.body;

        const result = await collection.updateOne({ _id: new ObjectId(genreId) }, { $set: updatedGenre });
        res.json({ message: `${result.modifiedCount} document(s) updated` });
    } finally {
        await client.close();
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("fuwafuwa");
        const collection = database.collection("genrelist");

        const genreId = req.params.id;

        const result = await collection.deleteOne({ _id: new ObjectId(genreId) });
        res.json({ message: `${result.deletedCount} document(s) deleted` });
    } finally {
        await client.close();
    }
});

module.exports = router;
