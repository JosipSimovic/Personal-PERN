import React from "react";
import { CSSTransition } from "react-transition-group";
import Slider from "@mui/material/Slider";
import Button from "../../../shared/components/UI/Button";
import { Checkbox, FormGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import "./FilterSide.css";

function valuetext(value) {
  return `${value} €`;
}

const FilterSide = (props) => {
  const { values, priceChangeHandler, colorCheckHandler, resetSideFilters } = props.filters;

  const filterClickHandler = () => {

    props.reloadProducts();
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
                  value={values.price}
                  onChange={priceChangeHandler}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  max={values.maxPrice}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h4>Colors</h4>
                <ul className="colors-list">
                  <FormGroup>
                    {props.productColors.map((item) => (
                      <FormControlLabel
                        key={item}
                        control={<Checkbox />}
                        label={item.toUpperCase()}
                        value={item}
                        onClick={colorCheckHandler}
                        checked={
                          props.filters.values.colors.includes(item)
                            ? true
                            : false
                        }
                      />
                    ))}
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
