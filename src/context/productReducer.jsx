export const initialState = {
  productsState: "",
  products: [],
  loading: false,
  error: false,
};

export function productReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: false };

    case "SET_ERROR":
      return { ...state, loading: false, error: true };

    case "FETCH_SUCCESS":
      return {
        ...state,
        productsState: action.payload.length == 0 ? "isEmpty" : "",
        loading: false,
        products: action.payload,
        error: false,
      };

    case "FETCH_PRODUCT_SUCCESS":
      return {
        ...state,
      };

    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        productsState: state.products.length == 0 ? "isEmpty" : "",
        products: [action.payload, ...state.products],
        error: null,
      };

    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        productsState: state.products.length == 0 ? "isEmpty" : "",
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, ...action.payload.body }
            : product,
        ),
        error: false,
      };

    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        productsState: state.products.length == 0 ? "isEmpty" : "",
        products: state.products.filter(
          (product) => product.id !== action.payload,
        ),
        error: false,
      };

    default:
      return state;
  }
}
