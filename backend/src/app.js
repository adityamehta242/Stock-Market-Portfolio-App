import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import route from "./routes/index.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Home");
});

app.use("/api", route);

export default app;
