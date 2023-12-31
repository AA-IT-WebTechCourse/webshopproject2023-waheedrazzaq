import React, { useState, useEffect } from "react";
import Item from "./item";

const ItemList = ({ items }) => {
  return (
    <div>
      {items?.map((item) => (
        <Item
          key={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          dateAdded={item.dateAdded}
        />
      ))}
    </div>
  );
};

export default ItemList;
