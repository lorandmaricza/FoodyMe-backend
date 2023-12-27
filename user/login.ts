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
                const userResult = result[0];
                const isPasswordMatch = await bcrypt.compare(user.password, userResult.password);
                if (isPasswordMatch) {
                    const user: User = {
                        firstName: userResult.first_name,
                        lastName: userResult.last_name,
                        email: userResult.email,
                        password: userResult.password,
                        userId: userResult.id,
                        roleId: userResult.role_id
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