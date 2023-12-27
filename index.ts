import { Request as ExpressRequest, Response } from "express";
import {login} from "./user/login";
import {signup} from "./user/signup";
import {emailValidate} from "./user/email-validate";
import {getAllCategories} from "./category/all";

interface Request extends ExpressRequest {
    session: any;
}

const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const port = 3001;
const day = 1000 * 60 * 60 * 24;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: day
    } //secure should be true in production
}));

app.get("/session", (req: Request, res: Response) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false, message: "Not logged in" });
    }
});

app.post("/user/login", (req: Request, res: Response) => {
    login(req, res);
});

app.post("/user/signup", async (req: Request, res: Response) => {
    await signup(req, res);
});

app.post("/user/email-validate", async (req: Request, res: Response) => {
    const email = req.body.email;
    await emailValidate(email, res);
});

app.get("/user/logout", (req: Request, res: Response) => {
    req.session.destroy();
    res.send({ status: "success", message: "User logged out" });
});

app.post("/category/all", async (req: Request, res: Response) => {
   await getAllCategories(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});