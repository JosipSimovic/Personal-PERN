import React, { useState } from "react";
import ProductEditItem from "./ProductEditItem";
import Modal from "../../../shared/components/UI/Modal";
import EditItemForm from "./EditItemForm";

import "./AllProducts.css";

const AllProducts = (props) => {
  const [itemToEdit, setItemToEdit] = useState(null);

  const editItemHandler = (item) => {
    setItemToEdit(item);
  };

  return (
    <React.Fragment>
      {itemToEdit && (
        <Modal
          header={itemToEdit.name}
          show={itemToEdit}
          onCancel={() => setItemToEdit(null)}
        >
          <EditItemForm
            reloadProducts={props.reloadProducts}
            item={itemToEdit}
            clearItemToEdit={() => setItemToEdit(null)}
          />
        </Modal>
      )}
      <div className="all-products-div">
        <ul>
          {props.products.map((item) => {
            return (
              <ProductEditItem
                key={item.id}
                item={item}
                editItemHandler={editItemHandler}
              />
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default AllProducts;
