import React, { useState, useEffect } from "react";
import "../App.css";

const Stocks = ({ addToWatchlist, watchlist }) => {
    const [stocks, setStocks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const query = searchQuery ? `?search=${searchQuery}` : '';
                const response = await fetch(`http://localhost:7000/api/stock${query}`);
                const data = await response.json();
                setStocks(data);
            } catch (error) {
                console.error("Error fetching stocks:", error);
            }
        };
    
        fetchStocks();
    }, [searchQuery]);
    

    const getRandomColor = () => {
        const colors = ["#FF0000", "#00FF00"]; // Red and Green
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const filteredStocks = stocks.filter(stock =>
        stock.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isInWatchlist = (symbol) => {
        return watchlist.some(stock => stock.symbol === symbol);
    };

    return (
        <div className="App">
            <h1>Stock Market MERN App</h1>
            <h2>Stocks</h2>
            <input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {filteredStocks.map((stock) => (
                    <li key={stock.symbol}>
                        {stock.company} ({stock.symbol}) -
                        <span style={{ color: getRandomColor() }}>
                            {" "}${stock.initial_price}
                        </span>
                        {isInWatchlist(stock.symbol) ? (
                            <span style={{ marginLeft: "10px", color: "#00FF00" }}>
                                &#10003; In Watchlist
                            </span>
                        ) : (
                            <button onClick={() => addToWatchlist(stock)}>
                                Add to My Watchlist
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Stocks;
