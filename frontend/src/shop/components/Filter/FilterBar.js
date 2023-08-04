import React, { useRef } from "react";
import FilterSide from "./FilterSide";

import "./FilterBar.css";

const FilterBar = (props) => {
  const inputRef = useRef();
  

  const searchProductHandler = () => {
    if (inputRef.current === document.activeElement) {
      alert("Product find");
    } else {
      inputRef.current.focus();
    }
  };

  const enterPressHandler = (e) => {
    if (e.key === "Enter") {
      props.filterProducts(inputRef.current.value);
    }
  };

  return (
    <React.Fragment>
      <FilterSide products={props.products} show={props.filterOpen} close={props.filterOpenHandler} />
      <div className="filter-bar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <button className="filter-button" onClick={props.filterOpenHandler}>
                <i className="fa-solid fa-filter"></i> Filter
              </button>
            </div>
            <div className="col-10">
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterBar;
