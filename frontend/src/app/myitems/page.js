"use client";

import React, { useState, useEffect } from "react";
import ItemList from "../components/itemList";

export default function MyItems() {
  const [items, setItems] = useState([]);

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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/myitems");
        if (response.ok) {
          const data = await response.json(); // Get the JSON response
          setItems(data.items);
        } else {
          console.error(
            "An error occurred while fetching items:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred while fetching items:", error);
      }
    };
    fetchItems();
  }, []);
  return <ItemList items={items} onAddToCart={onAddToCart} />;
}
