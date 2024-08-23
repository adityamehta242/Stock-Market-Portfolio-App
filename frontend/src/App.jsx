import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Stocks from "./components/Stocks";
import Watchlist from "./components/Watchlist";
import "./App.css";

function App() {
    const [watchlist, setWatchlist] = useState([]);

    const addToWatchlist = (stock) => {
        if (watchlist.some(item => item.symbol === stock.symbol)) {
            alert("Stock is already in your watchlist!");
            return;
        }

        fetch("http://localhost:7000/api/watchlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stock),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                    setWatchlist([...watchlist, stock]);
                } else {
                    alert(data.error || "Failed to add stock to watchlist");
                }
            })
            .catch((error) =>
                console.error("Error adding to watchlist:", error)
            );
    };

    const removeFromWatchlist = (symbol) => {
        fetch(`http://localhost:7000/api/watchlist/${symbol}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                    setWatchlist((prevWatchlist) =>
                        prevWatchlist.filter((stock) => stock.symbol !== symbol)
                    );
                } else {
                    alert(data.error || "Failed to remove stock from watchlist");
                }
            })
            .catch((error) => console.error("Error removing from watchlist:", error));
    };

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route
                    path="/stocks"
                    element={<Stocks addToWatchlist={addToWatchlist} watchlist={watchlist} />}
                />
                <Route
                    path="/watchlist"
                    element={<Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
