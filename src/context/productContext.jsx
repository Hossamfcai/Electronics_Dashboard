import { createContext, useContext, useReducer } from "react";
import { ProductsActions } from "../hooks/productActions";
import { initialState, productReducer } from "./productReducer";

const ProductStateContext = createContext(undefined);
const ProductDispatchContext = createContext(undefined);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductStateContext.Provider value={state}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductStateContext.Provider>
  );
};

// Hook for reading state (triggers re-renders on state changes)
export const useProductState = () => {
  const context = useContext(ProductStateContext);
  if (context === undefined) {
    throw new Error("useProductState must be used within a ProductProvider");
  }
  return context;
};

// Hook for actions only (STABLE: never triggers re-renders when state updates)
export const useProductDispatch = () => {
  const dispatch = useContext(ProductDispatchContext);
  if (dispatch === undefined) {
    throw new Error("useProductDispatch must be used within a ProductProvider");
  }
  return ProductsActions(dispatch);
};
