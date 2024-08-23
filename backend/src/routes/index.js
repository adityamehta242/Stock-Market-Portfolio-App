import { Router } from "express";
import stockRoute from "./stock-route.js";
import watchlistRoute from "./watchlist-route.js";

const route = Router();

route.use(stockRoute);
route.use(watchlistRoute);

export default route;
