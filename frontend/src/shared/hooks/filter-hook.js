import { useCallback, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "RESET_SIDE_FILTERS":
      return {
        ...state,
        colors: [],
        price: [0,0]
      }
    case "PRICE_CHANGE":
      return {
        ...state,
        price: action.value,
      };
    case "COLOR_CHANGE":
      if (action.checked) {
        let colorsArray = state.colors;
        colorsArray.push(action.value);
        console.log(colorsArray);
        return {
          ...state,
          colors: colorsArray,
        };
      } else {
        let colorsArray = state.colors.filter(
          (color) => color !== action.value
        );
        console.log(colorsArray);
        return {
          ...state,
          colors: colorsArray
        }
      }
    case "NAME_FILTER_CHANGE":
      return {
        ...state,
        name: action.value,
      };
    case "NUM_OF_PRODUCTS_CHANGE":
      return { ...state, numOfProducts: action.value };
    case "SORT_CHANGE":
      console.log(action.value);
      return {
        ...state,
        sort: action.value,
      };
    default:
      return { ...state };
  }
};

export const useFilter = () => {
  const [values, dispatch] = useReducer(reducer, {
    name: "",
    maxPrice: 0,
    sort: 0,
    numOfProducts: 20,
    price: [0, 0],
    colors: [],
  });

  const resetSideFilters = useCallback(() => {
    dispatch({type: "RESET_SIDE_FILTERS"})
  });

  const priceChangeHandler = useCallback((event, value) => {
    dispatch({ type: "PRICE_CHANGE", value });
  });

  const colorCheckHandler = useCallback((event) => {
    if (event.target.tagName !== "INPUT") return;
    let checked = event.target.checked;
    let value = event.target.value;
    dispatch({ type: "COLOR_CHANGE", checked, value });
  });

  const sortChangeHandler = useCallback((event) => {
    let value = event.target.value;
    dispatch({ type: "SORT_CHANGE", value });
  });

  const numOfProductsChangeHandler = useCallback((event) => {
    let value = event.target.value;
    dispatch({ type: "NUM_OF_PRODUCTS_CHANGE", value });
  });

  const nameChange = useCallback((value) => {
    dispatch({ type: "NAME_FILTER_CHANGE", value });
  });

  return {
    values,
    priceChangeHandler,
    colorCheckHandler,
    sortChangeHandler,
    numOfProductsChangeHandler,
    nameChange,
    resetSideFilters
  };
};
