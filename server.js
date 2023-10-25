const express = require('express');
require('dotenv').config()

const app = express();
const PORT = 5000;

const genrelistRoutes = require('./routes/genrelist');

app.use('/genrelist', genrelistRoutes);


app.listen(PORT, () => {
    console.log(`Server Anime berjalan di http://localhost:${PORT}`);
});
