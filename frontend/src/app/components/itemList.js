import React, { useState, useEffect } from "react";
import Item from "./item";

const ItemList = ({ items, onAddToCart = { onAddToCart } }) => {
  return (
    <div>
      {items?.map((item) => (
        <Item
          key={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          dateAdded={item.dateAdded}
          onAddToCart={() => onAddToCart(item.id)} // Correctly passing the function
        />
      ))}
    </div>
  );
};

export default ItemList;
