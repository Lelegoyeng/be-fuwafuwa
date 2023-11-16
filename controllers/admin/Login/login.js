const response = require('../../../utils/respons');
const connectToMongo = require('../../../config/mongodb')

exports.login = async (req, res) => {
    try {
        const database = await connectToMongo();
        const collection = database.collection("admin");

        const email = req.body.email
        const password = req.body.password

        if (!email) return response.invalidInput('Email Tidak Boleh Kosong!', res);
        if (!password) return response.invalidInput('Password Tidak Boleh Kosong!', res);

        const user = await collection.findOne({ email: email, password: password });

        if (!user) {
            return response.invalidInput('Email/ID Member atau password salah', res);
        }

        const result = user.email

        return response.success("Login Success", res, result);
    } catch (err) {
        return response.error(
            err.message || 'Invalid request',
            res,
            err.code || 500
        );
    }
}