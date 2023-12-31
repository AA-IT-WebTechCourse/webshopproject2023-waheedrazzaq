import React from "react";

const Item = ({ title, description, price, dateAdded }) => {
  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <p>Date Added: {dateAdded}</p>
    </div>
  );
};

export default Item;
