import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export async function getAllProducts() {
  const response = await axios.get(`${apiUrl}/api/products`);
  console.log(response);
  if (response.status !== 200)
    throw new Error(`Failed to fetch products (${response.status})`);
  console.log(response.data.data);
  return response.data.data;
}
export async function getProductService(id) {
  const response = await axios.get(`${apiUrl}/api/products/${id}`);
  console.log(response);
  if (response.status !== 200)
    throw new Error(`Failed to fetch product (${response.status})`);
  console.log(response.data.data);
  return response.data.data;
}

export async function deleteProductService(id) {
  const response = await axios.delete(`${apiUrl}/api/products/${id}`);
  if (!response.data.success)
    throw new Error(`Failed to fetch products (${response.status})`);
  console.log(response);
  return response.data.success;
}

export async function updateProductService(body, id) {
  console.log(typeof body);
  const response = await axios.put(`${apiUrl}/api/products/${id}`, body);
  if (!response.data.success)
    throw new Error(`Failed to update product (${response.status})`);
  console.log(response);
  return response.data.success;
}

export async function addProductService(body) {
  console.log(typeof body);
  const response = await axios.post(`${apiUrl}/api/products`, body);
  if (!response.data.success)
    throw new Error(`Failed to add product (${response.status})`);
  console.log(response);
  return response.data.success;
}
