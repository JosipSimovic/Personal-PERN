import React, { useRef } from "react";
import FilterSide from "./FilterSide";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setFilterName,
  setNumOfProducts,
  setSort,
} from "../../../features/webshop/filtersSlice";

import "./FilterBar.css";

const FilterBar = (props) => {
  const inputRef = useRef();
  const activeFiltersRef = useRef();
  const dispatch = useDispatch();

  const searchProductHandler = (event) => {
    if (inputRef.current === document.activeElement) {
      dispatch(setFilterName(inputRef.current.value));
    } else {
      inputRef.current.focus();
    }
  };

  const enterPressHandler = (e) => {
    if (e.key === "Enter") {
      dispatch(setFilterName(inputRef.current.value));
    }
  };

  return (
    <React.Fragment>
      <FilterSide
        products={props.products}
        show={props.filterOpen}
        close={props.filterOpenHandler}
        filters={props.filters}
        reloadProducts={props.reloadProducts}
        productColors={props.productColors}
      />
      <div className="filter-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-2">
              <button
                className="filter-button"
                onClick={props.filterOpenHandler}
              >
                <i className="fa-solid fa-filter"></i> Filter
              </button>
            </div>
            <div className="col-2">
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="sort-by-label">Sort by</InputLabel>
                <Select
                  labelId="sort-by-label"
                  label="Sort by"
                  onChange={(e) => dispatch(setSort(e.target.value))}
                  value={props.filters.sort}
                >
                  <MenuItem value={0}>A &rarr; Z</MenuItem>
                  <MenuItem value={1}>Z &rarr; A</MenuItem>
                  <MenuItem value={2}>Price ascending &uarr;</MenuItem>
                  <MenuItem value={3}>Price descending &darr;</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-2">
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="num-of-products">Products per page</InputLabel>
                <Select
                  labelId="num-of-products"
                  label="Products per page"
                  onChange={(e) => dispatch(setNumOfProducts(e.target.value))}
                  value={props.filters.numOfProducts}
                >
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-6">
              <div className="search">
                <input
                  type="text"
                  ref={inputRef}
                  onKeyDown={enterPressHandler}
                />
                <button
                  className="search-button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={searchProductHandler}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="row align-items-center">
            <div className="col-2 d-flex align-items-center text-start">
              <h5 className="m-0">Active filters:</h5>
            </div>
            <div className="col-10 d-flex align-items-center text-start">
              <ul className="filters-list" ref={activeFiltersRef}>
                {Object.entries(props.filters).map((entry) => {
                  let [key, value] = entry;
                  switch (key) {
                    case "colors":
                      let colorsArray = [];
                      for (let i = 0; i < value.length; i++) {
                        const element = value[i];
                        colorsArray.push(
                          <li key={element}>{element.toUpperCase()}</li>
                        );
                      }
                      return colorsArray;
                    case "price":
                      if (
                        (value[0] !== 0 &&
                          value[1] !== props.filters.maxPrice) ||
                        (value[0] !== 0 && value[1] !== 0)
                      ) {
                      return (
                        <li key={value}>
                          {value[0]} - {value[1]} €
                        </li>
                      );
                      }
                      break;
                    case "name":
                      if (value.trim() !== "") {
                        return <li key={value}>Name: <b>{value}</b></li>;
                      }
                      break;
                    default:
                      return null;
                  }
                  return null;
                })}
              </ul>
              {activeFiltersRef.current &&
                activeFiltersRef.current.children.length === 0 && (
                  <h5>No active filters.</h5>
                )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterBar;
