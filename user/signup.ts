import { Request, Response } from "express";
import { User } from "../types";
import { cryptPassword } from "../helpers";
import db from "../database";

export const signup = async (req: Request, res: Response) => {
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
}