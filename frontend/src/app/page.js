"use client";

import React, { useState, useEffect } from "react";
import ItemList from "./components/itemList";

export default function Shop() {
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const populateDB = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/populate_db");
      if (response.ok) {
        const data = await response.json(); // Get the JSON response
        setMessage(data.message);
      } else {
        setMessage("Error in populating database.");
      }
    } catch (error) {
      setMessage("An error occurred while populating the database.");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/search?q=${searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();
        setItems(data.items); // Update your items state with the search results
      } else {
        console.error("Search failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/items");
        if (response.ok) {
          const data = await response.json();
          setItems(data.items); // Adjust this according to the structure of your response
        } else {
          console.error("Failed to fetch items:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchItems();
  }, [message]);

  return (
    <div>
      <button onClick={populateDB}>Populate Database</button>
      {message && <p>{message}</p>}
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ItemList items={items} />
    </div>
  );
}
