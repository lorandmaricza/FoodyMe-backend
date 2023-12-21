import { Request as ExpressRequest, Response } from "express";
import {login} from "./user/login";
import {signup} from "./user/signup";

interface Request extends ExpressRequest {
    session: any;
}

const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const port = 3001;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } //https -> true
}));

app.post("/user/login", (req: Request, res: Response) => {
    login(req, res);
});

app.post("/user/signup", async (req: Request, res: Response) => {
    await signup(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});