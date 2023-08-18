import React from "react";
import Card from "../../../shared/components/UI/Card";

import "./ProductEditItem.css";

const ProductEditItem = (props) => {
  const item = props.item;

  return (
    <li>
      <Card>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-2">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="col-4">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <div className="col-6 text-end buttons">
              <button
                onClick={() => props.editItemHandler(item)}
                className="edit-button"
              >
                <i className="fa-solid fa-pen"></i> Edit
              </button>
              <button className="delete-button">
                <i className="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default ProductEditItem;
