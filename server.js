const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 5000;
const routes = require("./routes/index");

app.use(express.json());

app.get("/", (_, res) => {
    res.send({ message: "Server Is Online. :)" });
});

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server Anime berjalan di http://localhost:${PORT}`);
});
