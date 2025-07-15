import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./SearchResults.css";

function SearchResults() {
    const [items, setItems] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");

    useEffect(() => {
        if (query) {
            axios
                .get("http://localhost:4000/api/item/search-items?query=" + query)
                .then((res) => setItems(res.data))
                .catch((err) => console.error(err));
        }
    }, [query]);

    return (
        <div className="search-results-container">
            <h2 className="search-heading">Search results for "{query}"</h2>
            {items.length === 0 ? (
                <p className="no-results">No items found.</p>
            ) : (
                <div className="item-grid">
                    {items.map((item) => (
                        <div className="item-card" key={item._id}>
                            <img
                                src={`http://localhost:4000/uploads/${item.image}`}
                                alt={item.name}
                            />
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <p>Price: ₹{item.price}</p>
                            {item.shopId && (
                                <p style={{ fontStyle: "italic", color: "gray" }}>
                                    Sold by: {item.shopId.name}
                                </p>
                            )}


                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResults;
