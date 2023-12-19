const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./database");
const port = 3000;

app.use(cors());

app.get("/user/:userId", (req, res) => {
    const userId = req.params.userId;
    connection.query(`SELECT * FROM users WHERE id = ${userId}`, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});