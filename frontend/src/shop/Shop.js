import React, { useContext, useEffect, useState } from "react";
import ProductsList from "./components/ProductsList";
import FilterBar from "./components/Filter/FilterBar";
import PageNav from "./components/PageNav";
import { useSendRequest } from "../shared/hooks/http-request-hook";
import { useDispatch, useSelector } from "react-redux";
import { setMaxPrice } from "../features/webshop/filtersSlice";
import Modal from "../shared/components/UI/Modal";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./Shop.css";
import "./components/Filter/FilterSide.css";
import { AuthContext } from "../context/auth-context";

const Shop = () => {
  const auth = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useSendRequest();
  let [currentPage, setCurrentPage] = useState(1);
  let [maxPageNumber, setMaxPageNumber] = useState();
  const [filterOpen, setFilterOpen] = useState(false);
  const [productColors, setProductColors] = useState([]);

  const [errorModal, setErrorModal] = useState(false);

  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const loadProducts = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_WEBSHOP_URL,
        "POST",
        JSON.stringify({
          page: currentPage,
          filters: filters,
        }),
        { "Content-Type": "application/json" }
      );

      dispatch(setMaxPrice(responseData.maxPrice));

      setProductColors(responseData.colors);
      setProducts(responseData.products);
      setMaxPageNumber(responseData.maxPages);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    filters.sort,
    filters.numOfProducts,
    filters.name,
    filters.price,
    filters.colors,
  ]);

  const filterOpenHandler = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div>
      <Modal
        show={errorModal}
        header="Error"
        onCancel={() => setErrorModal(false)}
        extraButton={
          <React.Fragment>
            {!auth.isLoggedIn && (
              <NavLink to="/login">
                <Button>Sign in</Button>
              </NavLink>
            )}
          </React.Fragment>
        }
      >
        {errorModal}
      </Modal>

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
          setErrorModal={setErrorModal}
        />
        {products && maxPageNumber > 0 && (
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
