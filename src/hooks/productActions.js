import { useCallback } from "react";
import {
  deleteProductService,
  getAllProducts,
} from "../services/productApiServices";

export function ProductsActions(dispatch) {
  const getProducts = useCallback(async () => {
    if (!dispatch) return;
    dispatch({ type: "SET_LOADING" });
    try {
      const data = await getAllProducts();
      console.log(data);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      console.log("err is happen" + err);
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Error fetching products",
      });
    }
  }, [dispatch]);

  // Return the actions so components can use them

  const deleteProduct = useCallback(
    async (id) => {
      console.log(id);
      if (!dispatch) return;
      dispatch({ type: "SET_LOADING" });
      try {
        const data = await deleteProductService(id);
        if (data) {
          dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: id });
        }
      } catch (err) {
        console.log("err is happen" + err);
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "Error in delete products",
        });
      }
    },
    [dispatch],
  );

  // Return the actions so components can use them
  return { getProducts, deleteProduct };
}
