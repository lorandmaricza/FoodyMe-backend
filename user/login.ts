import { Request as ExpressRequest, Response } from "express";
import db from "../database";
import { User } from "../types";

const bcrypt = require("bcryptjs");

interface Request extends ExpressRequest {
    session: any;
}

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
                    const user: User = {
                        firstName: userData.first_name,
                        lastName: userData.last_name,
                        email: userData.email,
                        password: userData.password,
                        roleId: userData.role_id.toString()
                    };
                    req.session.user = user;
                    res.send({ status: "success", user: user });
                } else {
                    res.send({ status: "error", message: "Wrong password" });
                }
            }
        }
    );
};