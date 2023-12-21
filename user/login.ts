import { Request, Response } from "express";
import db from "../database";
import { User } from "../types";

const bcrypt = require("bcryptjs");

export const login = (req: Request, res: Response) => {
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
};