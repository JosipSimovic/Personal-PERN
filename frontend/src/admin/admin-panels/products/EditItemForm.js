import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSendRequest } from "../../../shared/hooks/http-request-hook";
import { AuthContext } from "../../../context/auth-context";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setCartState } from "../../../features/cart/cartSlice";

const EditItemForm = (props) => {
  const item = props.item;
  const auth = useContext(AuthContext);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { isLoading, sendRequest } = useSendRequest();

  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const pricePattern = /^\d+(\.\d{1,2})?$/;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item.name,
      description: item.description,
      price: item.price,
    },
  });

  const onSubmit = async (data) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_WEBSHOP_URL}/updateProduct`,
        "PATCH",
        JSON.stringify({
          pid: item.id,
          formData: data,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      let foundInCart = cart.find((element) => element.id === item.id);

      if (foundInCart) {
        try {
          const resultData = await sendRequest(
            `${process.env.REACT_APP_USER_URL}/cart/${auth.userId}`,
            "GET",
            null,
            {
              authorization: `Bearer ${auth.token}`,
            }
          );
          if (resultData.products.length > 0) {
            dispatch(setCartState(resultData.products));
          }
        } catch (e) {
          alert(e);
        }
      }

      window.toast.success("Updated product '" + item.name + "'");

      props.clearItemToEdit();
      props.reloadProducts();
    } catch (e) {
      props.clearItemToEdit();
    }
  };

  return (
    <React.Fragment>
      {isLoading && (
        <LoadingSpinner
          asOverlay
          message="Updating product... Please wait..."
        />
      )}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input
          {...register("name", {
            validate: {
              specialChars: (s) =>
                !specialChars.test(s) ||
                "Name must not contain special characters.",
            },
          })}
          id="name"
          type="text"
        />
        {errors.name && <span>{errors.name.message}</span>}

        <label htmlFor="description">Description:</label>
        <textarea
          style={{ overflow: "auto" }}
          {...register("description", {
            validate: {
              minLength: (s) =>
                s.length >= 10 || "Description has to be at least 10 letters.",
            },
          })}
          id="description"
          type="textarea"
        />
        {errors.description && <span>{errors.description.message}</span>}

        <label htmlFor="price">Price:</label>
        <input
          {...register("price", {
            pattern: {
              value: pricePattern,
              message:
                "Price must be a valid decimal number with up to 2 decimal places.",
            },
          })}
          id="price"
          type="text"
        />
        {errors.price && <span>{errors.price.message}</span>}

        <br />
        <div className="text-center">
          <Button type="submit">Apply changes</Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditItemForm;
