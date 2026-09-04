export const initialState = {
  specificProduct: {},
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

    case "FETCH_SUCCESS": {
      const payload = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        productsState: payload.length === 0 ? "isEmpty" : "",
        loading: false,
        products: payload,
        error: false,
        specificProduct: {},
      };
    }
    case "FETCH_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        specificProduct: { ...action.payload },
      };

    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        productsState: state.products.length == 0 ? "isEmpty" : "",
        products: [action.payload, ...state.products],
        error: null,
        specificProduct: {},
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
        specificProduct: { ...action.payload.body },
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
        specificProduct: {},
      };

    default:
      return state;
  }
}
