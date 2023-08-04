import React, { useEffect, useState } from "react";
import ProductsList from "./components/ProductsList";
import FilterBar from "./components/Filter/FilterBar";

import "./Shop.css";
import "./components/Filter/FilterSide.css";
import PageNav from "./components/PageNav";
import { useSendRequest } from "../shared/hooks/http-request-hook";
import { useFilter } from "../shared/hooks/filter-hook";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, error, sendRequest, clearError] = useSendRequest();
  const filters = useFilter();
  let [currentPage, setCurrentPage] = useState(1);
  let [maxPageNumber, setMaxPageNumber] = useState();
  const [filterOpen, setFilterOpen] = useState(false);
  const [productColors, setProductColors] = useState([]);

  const loadProducts = async () => {
    console.log(filters.values);
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/webshop`,
        "POST",
        JSON.stringify({
          page: currentPage,
          filters: filters.values,
        }),
        { "Content-Type": "application/json" }
      );
      filters.values.maxPrice = responseData.maxPrice;

      setProductColors(responseData.colors);
      setProducts(responseData.products);
      setMaxPageNumber(responseData.maxPages);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [
    currentPage,
    filters.values.sort,
    filters.values.numOfProducts,
    filters.values.name,
  ]);

  const filterOpenHandler = () => {
    setFilterOpen(filterOpen ? false : true);
  };

  return (
    <div>
      <React.Fragment>
        {filterOpen && (
          <div className="filter-backdrop" onClick={filterOpenHandler}></div>
        )}
        <FilterBar
          products={products}
          filterOpen={filterOpen}
          filterOpenHandler={filterOpenHandler}
          filters={filters}
          reloadProducts={loadProducts}
          productColors={productColors}
        />
        <ProductsList
          error={error}
          clearError={clearError}
          isLoading={isLoading}
          products={products}
        />
        {products && products.length > 0 && (
          <PageNav
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            maxPageNumber={maxPageNumber}
          />
        )}
        <br />
      </React.Fragment>
    </div>
  );
};

export default Shop;
