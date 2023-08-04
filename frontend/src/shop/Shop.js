import React, { useEffect, useState } from "react";
import ProductsList from "./components/ProductsList";
import FilterBar from "./components/Filter/FilterBar";
import { fa, faker } from "@faker-js/faker";

import "./Shop.css";
import "./components/Filter/FilterSide.css";

const Shop = () => {
  const [DUMMY_PRODUCTS, setDummyProducts] = useState([]);

  useEffect(() => {
    let dummy_products = [];
    for (let i = 0; i < 20; i++) {
      dummy_products.push({
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ max: 100, min: 1, dec: 2, symbol: "€" }),
        image: faker.image.url(),
        color: faker.color.human(),
      });
    }
    setDummyProducts(dummy_products);
    console.log(dummy_products);
  }, []);

  const [filterOpen, setFilterOpen] = useState(false);

  const filterOpenHandler = () => {
    setFilterOpen(filterOpen ? false : true);
  };

  const filterProductsHandler = (string) => {
    setDummyProducts(() => {
      let filteredProducts = DUMMY_PRODUCTS.filter((item) =>
        item.name.includes(string)
      );
      return filteredProducts;
    });
  };

  return (
    <div>
      {filterOpen && (
        <div className="filter-backdrop" onClick={filterOpenHandler}></div>
      )}
      <FilterBar
        products={DUMMY_PRODUCTS}
        filterOpen={filterOpen}
        filterOpenHandler={filterOpenHandler}
        filterProducts={filterProductsHandler}
      />
      <ProductsList items={DUMMY_PRODUCTS} />
    </div>
  );
};

export default Shop;
