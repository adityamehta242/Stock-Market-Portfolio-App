import { Router } from "express";
import Stock from "../models/stock.js";

const watchlistRoute = Router();

// Add stock to watchlist
watchlistRoute.post("/watchlist", async (req, res) => {
    try {
        const { company, description, initial_price, price_2002, price_2007, symbol } = req.body;
        const stock = new Stock({ company, description, initial_price, price_2002, price_2007, symbol });
        await stock.save();
        res.json({ success: true, message: "Stock added to watchlist successfully" });
    } catch (error) {
        console.error("watchlistRoute error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Delete stock from watchlist
watchlistRoute.delete("/watchlist/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;
        const result = await Stock.deleteOne({ symbol });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Stock not found" });
        }

        res.json({ success: true, message: "Stock removed from watchlist successfully" });
    } catch (error) {
        console.error("watchlistRoute delete error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Get all stocks in watchlist
watchlistRoute.get("/watchlist", async (req, res) => {
    try {
        const watchlist = await Stock.find();
        res.json(watchlist);
    } catch (error) {
        console.error("watchlistRoute get error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default watchlistRoute;
