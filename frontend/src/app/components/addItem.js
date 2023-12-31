"use client";

import React, { useState } from "react";

function AddItemForm({ onAddItem }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddItem({ title, description, price });
    setTitle("");
    setDescription("");
    setPrice("");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;
