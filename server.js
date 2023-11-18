const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = 5000;
const routes = require("./routes/index");

app.use(express.json());
app.use(cors());


app.get("/", (_, res) => {
    res.send({ message: "Server Is Online. :)" });
});

routes.admin(app);

app.listen(PORT, () => {
    console.log(`Server Anime berjalan di http://localhost:${PORT}`);
});
