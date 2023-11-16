const response = require('../../../utils/respons');
const connectToMongo = require('../../../config/mongodb')


exports.get = async (req, res) => {
    try {
        const database = await connectToMongo();
        const collection = database.collection("genrelist");
        const result = await collection.find({}).toArray();

        return response.success("Get GenreList Success", res, result);
    } catch (err) {
        return response.error(
            err.message || 'Invalid request',
            res,
            err.code || 500
        );
    }
}