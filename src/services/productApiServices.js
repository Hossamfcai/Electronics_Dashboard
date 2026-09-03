import axios from "axios";

export async function getAllProducts() {
  const response = await axios.get("http://localhost:5000/api/products");
  console.log(response);
  if (response.status !== 200)
    throw new Error(`Failed to fetch products (${response.status})`);
  console.log(response.data.data);
  return response.data.data;
}

export async function deleteProductService(id) {
  const response = await axios.delete(
    `http://localhost:5000/api/products/${id}`,
  );
  if (!response.data.success)
    throw new Error(`Failed to fetch products (${response.status})`);
  console.log(response);
  return response.data.success;
}
