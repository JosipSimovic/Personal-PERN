import React, { useRef, useState } from "react";

import "./FilterBar.css";

const FilterBar = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const inputRef = useRef();
  const [searchExpanded, setSearchExpanded] = useState(false);

  const filterOpenHandler = () => {
    setFilterOpen(filterOpen ? false : true);
  };

  const searchProductHandler = () => {
    console.log("Product");
    if (inputRef.current === document.activeElement) {
      alert("Product find");
    } else {
      inputRef.current.focus();
    }
  };

  const enterPressHandler = (e) => {
    if (e.key === 'Enter') {
        searchProductHandler();
    }
  }

  return (
    <div className="filter-bar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <button className="filter-button" onClick={filterOpenHandler}>
              <i className="fa-solid fa-filter"></i> Filter
            </button>
          </div>
          <div className="col-10">
            <div className="search">
              <input type="text" ref={inputRef} onKeyDown={enterPressHandler} />
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

        {filterOpen && (
          <div className="row filter-div">
            <div className="col-12">
              <h1>AAAA</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
