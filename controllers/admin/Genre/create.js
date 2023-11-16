const response = require('../../../utils/respons');
const connectToMongo = require('../../../config/mongodb')


exports.create = async (req, res) => {
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

        return response.success("Create GenreList Success", res, result);
    } catch (err) {
        return response.error(
            err.message || 'Invalid request',
            res,
            err.code || 500
        );
    }
}