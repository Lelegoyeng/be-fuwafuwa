const response = require('../../../utils/respons');
const connectToMongo = require('../../../config/mongodb');
const { MongoClient, ObjectId } = require("mongodb");



exports.del = async (req, res) => {
    try {
        const database = await connectToMongo();
        const collection = database.collection("genrelist");

        const genreId = req.params.id;

        const result = await collection.deleteOne({ _id: new ObjectId(genreId) });

        return response.success("Delete GenreList Success", res, result);
    } catch (err) {
        return response.error(
            err.message || 'Invalid request',
            res,
            err.code || 500
        );
    }
}