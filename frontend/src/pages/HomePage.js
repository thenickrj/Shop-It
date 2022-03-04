import React, { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  let [products, setProducts] = useState();

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.json());
        setProducts(data);
      });
  });

  return (
    <div>
      HomePage
      <div className="row center">
        {products.map((product) => (
          <div>{product.name}</div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
