import { useCallback, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "PRICE_CHANGE":
      return {
        ...state,
        price: action.value,
      };
      case "COLOR_CHANGE":
        alert(action.event.target.value);
        if (state.colors.includes(action.target.value)) {
          
        }
        return {
          ...state,

        }
    default:
      return { ...state };
  }
};

export const useFilter = () => {
  const [filters, dispatch] = useReducer(reducer, {
    name: "",
    maxPrice: 200,
    price: [0, 200],
    colors: []
  });

  const priceChangeHandler = useCallback((event, value) => {
    dispatch({ type: "PRICE_CHANGE", value });
  });

  const colorCheckHandler = useCallback((event, value) => {
    console.log(event.target);
    //dispatch({ type: "COLOR_CHANGE", event });
  });

  return [filters, priceChangeHandler, colorCheckHandler];
};
