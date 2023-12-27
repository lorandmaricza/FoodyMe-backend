import { Request, Response } from 'express';
import db from '../database';

export const getAllCategories = async (req: Request, res: Response) => {
    const sql: string = 'SELECT * FROM categories';

    db.query(sql, (err, result) => {
        if (err) {
            res.send({ status: 'error', message: err.message });
        } else {
            res.send({ status: 'success', categories: result });
        }
    });
}