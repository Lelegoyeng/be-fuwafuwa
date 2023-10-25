const express = require('express');
const router = express.Router();

module.exports = (connectToMongo) => {
    router.use(express.json());

    router.get('/', async (req, res) => {
        try {
            const database = await connectToMongo();
            const collection = database.collection("genrelist");
            const result = await collection.find({}).toArray();
            res.json(result);
        } catch (error) {
            console.error('Error fetching genre list:', error);
        }
    });

    router.post('/', async (req, res) => {
        try {
            const database = await connectToMongo();
            const collection = database.collection("genrelist");

            const get = await collection.find({}).toArray();
            const genreId_Increment = Math.max(...get.map(value => value.genre_id));
            const newGenre = {
                nama: req.body.nama,
                genre_id: genreId_Increment + 1
            }

            const result = await collection.insertOne(newGenre);
            res.json(result);
        } catch (error) {
            console.error('Error adding genre:', error);
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const database = await connectToMongo();
            const collection = database.collection("genrelist");

            const genreId = req.params.id;
            const updatedGenre = req.body;

            const result = await collection.updateOne({ _id: new ObjectId(genreId) }, { $set: updatedGenre });
            res.json({ message: `${result.modifiedCount} document(s) updated` });
        } catch (error) {
            console.error('Error updating genre:', error);
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const database = await connectToMongo();
            const collection = database.collection("genrelist");

            const genreId = req.params.id;

            const result = await collection.deleteOne({ _id: new ObjectId(genreId) });
            res.json({ message: `${result.deletedCount} document(s) deleted` });
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
    });

    return router;
};
