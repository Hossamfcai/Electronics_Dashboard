import { useCallback } from "react";
import {
  addProductService,
  deleteProductService,
  getAllProducts,
  getProductService,
  updateProductService,
} from "../services/productApiServices";

export function ProductsActions(dispatch) {
  const getProducts = useCallback(async () => {
    // console.log(apiUrl);
    if (!dispatch) return;
    dispatch({ type: "SET_LOADING" });
    try {
      const data = await getAllProducts();
      // console.log(data);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      console.log("err is happen" + err);
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Error fetching products",
      });
    }
  }, [dispatch]);

  const getSpecificProduct = useCallback(
    async (id) => {
      if (!dispatch) return;
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await getProductService(id);
        // console.log(response);
        dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: response });
      } catch (err) {
        console.log("err is happen" + err);
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "Error fetching product",
        });
        return err;
      }
    },
    [dispatch],
  );

  const deleteProduct = useCallback(
    async (id) => {
      console.log(id);
      if (!dispatch) return;
      dispatch({ type: "SET_LOADING" });
      try {
        const data = await deleteProductService(id);
        console.log(data);
        if (data) {
          dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: id });
        }
      } catch (err) {
        console.log("err is happen" + err);
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "Error in delete products",
        });
        console.log(err);
      }
    },
    [dispatch],
  );

  const updateProduct = useCallback(
    async (body, id) => {
      // console.log(id);
      if (!dispatch) return;
      dispatch({ type: "SET_LOADING" });
      try {
        // console.log(body, id);
        const data = await updateProductService(body, id);
        if (data) {
          dispatch({
            type: "UPDATE_PRODUCT_SUCCESS",
            payload: { id: id, body: body },
          });
        }
        return data;
      } catch (err) {
        console.log("err is happen" + err);
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "Error in update products",
        });
      }
    },
    [dispatch],
  );

  const addProduct = useCallback(
    async (body) => {
      // console.log(body);
      if (!dispatch) return;
      dispatch({ type: "SET_LOADING" });
      try {
        // console.log(body);
        const data = await addProductService(body);
        if (data) {
          dispatch({
            type: "ADD_PRODUCT_SUCCESS",
            payload: body,
          });
        }
        return data;
      } catch (err) {
        console.log("err is happen" + err);
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "Error in add product",
        });
      }
    },
    [dispatch],
  );

  // Return the actions so components can use them
  return {
    getProducts,
    deleteProduct,
    updateProduct,
    addProduct,
    getSpecificProduct,
  };
}
