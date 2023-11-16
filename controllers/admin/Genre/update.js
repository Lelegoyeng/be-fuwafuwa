const response = require('../../../utils/respons');
const connectToMongo = require('../../../config/mongodb')
const { MongoClient, ObjectId } = require("mongodb");


exports.update = async (req, res) => {
    try {
        const database = await connectToMongo();
        const collection = database.collection("genrelist");

        const genreId = req.params.id;
        const updatedGenre = req.body;

        const result = await collection.updateOne({ _id: new ObjectId(genreId) }, { $set: updatedGenre });

        return response.success("Update GenreList Success", res, result);
    } catch (err) {
        return response.error(
            err.message || 'Invalid request',
            res,
            err.code || 500
        );
    }
}