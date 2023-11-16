const response = require('../../../utils/respons');

const connectDB = require('../../../config/mongodb')


exports.get = async (req, res) => {
    try {
        console.log('aa')

        const result = ''
        return response.success("Get Hero Success", res, result);
    } catch (err) {
        return response.error(
            err.message || 'Invalid request',
            res,
            err.code || 500
        );
    }
}