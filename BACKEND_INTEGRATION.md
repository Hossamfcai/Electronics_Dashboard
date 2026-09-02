# Backend Integration Guide

Your React dashboard is now configured to connect to your Electronics_Dashboard_Backend API.

## Setup Completed ✅

### 1. **API Configuration** (`src/config/api.js`)
   - Central axios instance for all API calls
   - Automatic request/response interceptors
   - Authentication token handling (Bearer token support)
   - Error handling for unauthorized access

### 2. **Environment Variables** (`.env.local`)
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
   - Development: `http://localhost:5000/api`
   - Production: Update to your production backend URL

### 3. **API Services**
   - `src/services/productService.js` - Product-related API calls
   - `src/services/dashboardService.js` - Dashboard statistics and health

## How to Use

### Example 1: Fetch Products in a Component
```jsx
import { useState, useEffect } from 'react';
import productService from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

export default ProductList;
```

### Example 2: Fetch Dashboard Stats
```jsx
import { useState, useEffect } from 'react';
import dashboardService from '../services/dashboardService';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };

    loadStats();
  }, []);

  return (
    <div>
      {stats && (
        <div>
          <p>Total Products: {stats.totalProducts}</p>
          {/* Display other stats */}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
```

### Example 3: Create/Update Product
```jsx
const handleCreateProduct = async (productData) => {
  try {
    const result = await productService.createProduct(productData);
    console.log('Product created:', result);
  } catch (err) {
    console.error('Failed to create product:', err);
  }
};

const handleUpdateProduct = async (id, productData) => {
  try {
    const result = await productService.updateProduct(id, productData);
    console.log('Product updated:', result);
  } catch (err) {
    console.error('Failed to update product:', err);
  }
};
```

## Available API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/recent` - Get recent products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/health` - Get system health
- `GET /api/dashboard/summary` - Get dashboard summary

## Running the Application

1. **Start your backend**:
   ```bash
   cd ../Electronics_Dashboard_Backend
   npm start  # or your backend start command
   ```

2. **Start your frontend**:
   ```bash
   npm run dev
   # The app will run at http://localhost:5173
   # API calls will proxy through to http://localhost:5000/api
   ```

3. **Test the connection**:
   - Check browser console for any API errors
   - Use browser DevTools Network tab to see API calls

## Authentication (Optional)

If your backend requires authentication:

1. Store the auth token in localStorage:
   ```javascript
   localStorage.setItem('authToken', token);
   ```

2. The apiClient will automatically include it in all requests as:
   ```
   Authorization: Bearer <token>
   ```

## Troubleshooting

### CORS Issues
- Ensure your backend has CORS enabled for `http://localhost:5173`
- Vite's proxy configuration helps avoid CORS during development

### 404 Not Found
- Verify backend is running on port 5000
- Check the endpoint paths match your backend routes
- Check network tab in browser DevTools

### Connection Refused
- Make sure `npm run dev` is running
- Verify backend is running and accessible at `http://localhost:5000/api/health`

## Next Steps

1. Import and use the services in your components
2. Update the endpoint paths based on your actual backend API structure
3. Add more services as needed for other features
4. Implement authentication if required
5. Handle loading and error states in your UI
