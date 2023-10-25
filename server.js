const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = 5000;


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

app.use(helmet());
app.use(express.json());
app.use(restrictAccess);
// app.use(limiter);



const genrelistRoutes = require('./routes/genrelist');
app.use('/genrelist', genrelistRoutes);

app.listen(PORT, () => {
    console.log(`Server Anime berjalan di http://localhost:${PORT}`);
});
