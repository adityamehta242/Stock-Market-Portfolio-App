import { Router } from "express";
import Stock from "../models/stock.js";

const stockRoute = Router();

stockRoute.get("/stock", async (req, res) => {
    try {
        const { query } = req;
        const filter = {};
        
        if (query.search) {
            filter.$or = [
                { company: { $regex: query.search, $options: 'i' } },
                { symbol: { $regex: query.search, $options: 'i' } }
            ];
        }

        const stocks = await Stock.find(filter);
        res.json(stocks);
    } catch (error) {
        console.log("Stock-route Error " + error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default stockRoute;
