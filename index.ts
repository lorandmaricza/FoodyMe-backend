import { Request, Response } from "express";
import { User } from "./types";
import { cryptPassword } from "./helpers";
import db from "./database";

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.post("/user/login", (req: Request, res: Response) => {
    const user: User = req.body;
    const sql: string = `SELECT * FROM users WHERE email = ?`;
    const values: any = [user.email];

    db.query(
        sql, values,
        async function(err: any, result: any) {
            if (err) throw err;
            if (result.length === 0) {
                res.send({ status: "error", message: "User not found" });
            } else {
                const userData = result[0];
                const isPasswordMatch = await bcrypt.compare(user.password, userData.password);
                if (isPasswordMatch) {
                    res.send({ status: "success", userData: userData });
                } else {
                    res.send({ status: "error", message: "Wrong password" });
                }
            }
        }
    );
});

app.post("/user/signup", async (req: Request, res: Response) => {
    const user: User = req.body;
    user.roleId = req.body.role === "consumer" ? "1" : "2";
    user.password = await cryptPassword(user.password);
    const sql: string = `INSERT INTO users (first_name, last_name, email, password, role_id) VALUES (?, ?, ?, ?, ?)`;
    const values: any = [user.firstName, user.lastName, user.email, user.password, user.roleId];

    db.query(
        sql, values,
        function (err: any) {
            if (err) throw err;
            res.send({status: "success", message: "User created"});
        }
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});