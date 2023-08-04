import React from "react";
import { CSSTransition } from "react-transition-group";
import Slider from "@mui/material/Slider";
import Button from "../../../shared/components/UI/Button";
import { useFilter } from "../../../shared/hooks/filter-hook";
import { Checkbox, FormGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import "./FilterSide.css";

function valuetext(value) {
  return `${value} €`;
}

const FilterSide = (props) => {
  const [filters, priceChangeHandler, colorCheckHandler] = useFilter();

  const filterClickHandler = () => {
    console.log(filters);
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
                  value={filters.price}
                  onChange={priceChangeHandler}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  max={filters.maxPrice}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h4>Colors</h4>
                <ul>
                  <FormGroup onChange={colorCheckHandler}>
                    {props.products.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        control={<Checkbox />}
                        label={item.color.toUpperCase()}
                        value={item.color}
                      />
                    ))}
                  </FormGroup>
                </ul>
              </div>
            </div>
          </div>
          <div className="row apply-filters-button">
            <div className="col-12">
              <Button text={"Apply"} onClick={filterClickHandler} />
            </div>
          </div>
        </div>
      </aside>
    </CSSTransition>
  );
};

export default FilterSide;
