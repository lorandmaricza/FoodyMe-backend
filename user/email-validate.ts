import { Response } from "express";
import db from "../database";

export const emailValidate = async (email: string, res: Response) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const values = [email];
    db.query(
        sql, values,
        function(err, result) {
            if (err) throw err;
            if (result.length === 0) {
                res.send({ status: "success", message: "Email is available" });
            } else {
                res.send({ status: "error", message: "Email is already taken" });
            }
        }
    );
};