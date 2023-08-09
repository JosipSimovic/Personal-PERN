import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Slider from "@mui/material/Slider";
import Button from "../../../shared/components/UI/Button";
import { Checkbox, FormGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import "./FilterSide.css";
import { useDispatch } from "react-redux";
import {
  setFilterColors,
  setFilterPrice,
} from "../../../features/webshop/filtersSlice";

function valuetext(value) {
  return `${value} €`;
}

const FilterSide = (props) => {
  const [priceRange, setPriceRange] = useState(props.filters.price);
  const [colors, setColors] = useState(props.filters.colors);

  const dispatch = useDispatch();

  const priceChangeHandler = (event) => {
    setPriceRange(event.target.value);
  };

  const colorCheckHandler = (event) => {
    if (event.target.tagName !== "INPUT") return;
    let newColor = event.target.value;
    let checked = event.target.checked;
    let colorsArray = [...colors];
    if (checked) {
      colorsArray.push(newColor);
    } else {
      colorsArray = colorsArray.filter((color) => color !== newColor);
    }
    setColors(colorsArray);
  };

  const resetSideFilters = (event) => {
    setPriceRange([0, props.filters.maxPrice]);
    setColors([]);
  };

  const filterClickHandler = async () => {
    dispatch(setFilterColors(colors));
    dispatch(setFilterPrice(priceRange));
  };

  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames={"slide-in-left"}
      mountOnEnter
      unmountOnExit
    >
      <aside className="filter-div">
        <div className="container-fluid">
          <div className="row filter-div-header">
            <div className="col-10 my-auto text-center">
              <h5>Filters</h5>
            </div>
            <div className="col-2">
              <i
                className="fa-solid fa-xmark close-icon"
                onClick={props.close}
              ></i>
            </div>
          </div>
          <div className="filter-div-content">
            <div className="row">
              <div className="col-12">
                <h4>Price (€)</h4>
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={priceRange}
                  onChange={priceChangeHandler}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  max={Number(props.filters.maxPrice)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h4>Colors</h4>
                <ul className="colors-list">
                  <FormGroup>
                    {Object.entries(props.productColors).map(
                      ([id, colorInfo]) => (
                        <React.Fragment>
                          <FormControlLabel
                            key={id}
                            control={
                              <Checkbox style={{ color: colorInfo.hex }} />
                            }
                            label={colorInfo.color_name.toUpperCase()}
                            value={colorInfo.color_name}
                            onClick={colorCheckHandler}
                            checked={
                              colors.includes(colorInfo.color_name)
                                ? true
                                : false
                            }
                          />
                        </React.Fragment>
                      )
                    )}
                  </FormGroup>
                </ul>
              </div>
            </div>
          </div>
          <div className="row apply-filters-button">
            <div className="col-12">
              <Button onClick={resetSideFilters}>Remove filters</Button>
            </div>
            <div className="col-12">
              <Button onClick={filterClickHandler}>Apply</Button>
            </div>
          </div>
        </div>
      </aside>
    </CSSTransition>
  );
};

export default FilterSide;
