const response = require('../../../utils/respons');
const connectToMongo = require('../../../config/mongodb')
const config = require('../../../config/auth');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const database = await connectToMongo();
        const collection = database.collection("admin");

        const email = req.body.email
        const password = req.body.password

        if (!email) return response.invalidInput('Email Tidak Boleh Kosong!', res);
        if (!password) return response.invalidInput('Password Tidak Boleh Kosong!', res);

        let user, accessToken;
        user = await collection.findOne({ email: email, password: password });

        if (!user) { return response.invalidInput('Email/ID Member atau password salah', res); }

        accessToken = jwt.sign(
            { email: user.email }, config.accessSecret, { expiresIn: config.jwtExp }
        );

        const result = {
            email: user.email,
            access_token: accessToken
        }

        return response.success("Login Success", res, result);
    } catch (err) {
        return response.error(
            err.message || 'Invalid request',
            res,
            err.code || 500
        );
    }
}