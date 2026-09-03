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

    // case "ADD_USER_SUCCESS":
    //   return {
    //     ...state,
    //     loading: false,
    //     users: [action.payload, ...state.users],
    //     error: null,
    //   };

    // case "UPDATE_USER_SUCCESS":
    //   return {
    //     ...state,
    //     loading: false,
    //     users: state.users.map((user) =>
    //       user.id === action.payload.id ? { ...user, ...action.payload } : user,
    //     ),
    //     error: null,
    //   };

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
