const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config();

const app = express();
const PORT = 5000;

const uri = process.env.mongodb;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100,
});

const allowedIPs = ['::ffff:192.168.0.44'];

const restrictAccess = (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    if (allowedIPs.includes(clientIP)) {
        next();
    } else {
        res.status(403).json({ message: 'Akses Ditolak' });
    }
};

// Inisialisasi koneksi MongoDB
const connectToMongo = async () => {
    if (!client.connect()) {
        await client.connect();
    }
    return client.db("fuwafuwa");
};

app.use(helmet());
app.use(express.json());
app.use(restrictAccess);
app.use(cors());

app.use('/genrelist', require('./routes/genrelist')(connectToMongo)); // Mengirim fungsi connectToMongo sebagai argumen ke route

app.listen(PORT, () => {
    console.log(`Server Anime berjalan di http://localhost:${PORT}`);
});
