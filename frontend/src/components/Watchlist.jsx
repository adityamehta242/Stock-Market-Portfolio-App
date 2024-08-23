import React, { useState, useEffect } from "react";
import "../App.css";

const Watchlist = ({ watchlist, removeFromWatchlist }) => {
    const [watchlistState, setWatchlistState] = useState([]);

    useEffect(() => {
        setWatchlistState(watchlist);
    }, [watchlist]);

    const handleDelete = (symbol) => {
        removeFromWatchlist(symbol);
    };

    const getRandomColor = () => {
        const colors = ["#FF0000", "#00FF00"]; // Red and Green
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="App">
            <h1>Stock Market MERN App</h1>
            <h2>My Watchlist</h2>
            <ul>
                {watchlistState.map((stock) => (
                    <li key={stock.symbol}>
                        {stock.company} ({stock.symbol}) -
                        <span style={{ color: getRandomColor() }}>
                            {" "}${stock.initial_price}
                        </span>
                        <button onClick={() => handleDelete(stock.symbol)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Watchlist;
