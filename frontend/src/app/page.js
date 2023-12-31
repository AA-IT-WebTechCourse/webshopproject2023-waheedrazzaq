"use client";

import React, { useState, useEffect } from "react";
import ItemList from "./components/itemList";
import AddItemForm from "./components/addItem";

export default function Shop() {
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const populateDB = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/populate_database"
      );
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

  setTimeout(() => {
    if (message !== "") setMessage("");
  }, 5000);

  const onAddToCart = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/add/${itemId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/search?q=${searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
      } else {
        console.error("Search failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  useEffect(() => {
    if (searchTerm === "") return;
    handleSearch();
  }, [searchTerm]);

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [message]);

  const onAddItem = async ({ title, description, price }) => {
    try {
      const response = await fetch("http://localhost:8000/api/add_item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include session cookie
        body: JSON.stringify({ title, description, price }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Item added successfully");
      } else {
        alert("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

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
  useEffect(() => {
    fetchItems();
  }, [onAddItem]);

  return (
    <div>
      <button onClick={populateDB}>Populate Database</button>
      {message && <p>{message}</p>}
      <button onClick={fetchItems}>Sync Items</button>
      <button
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        Login to add items
      </button>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <AddItemForm onAddItem={onAddItem} />
      <ItemList items={items} onAddToCart={onAddToCart} />
    </div>
  );
}
