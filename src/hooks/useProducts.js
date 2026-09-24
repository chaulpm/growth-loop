import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, createProduct } from '../services/productService';

export function useProducts(initialBrandFilter = 'ALL') {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandFilter, setBrandFilter] = useState(initialBrandFilter);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(brandFilter);
      setProducts(data);
    } catch (err) {
      console.error('Lỗi load products:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [brandFilter]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addProduct = async (productData) => {
    try {
      const newProduct = await createProduct(productData);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      console.error('Lỗi tạo product:', err);
      throw err;
    }
  };

  return {
    products,
    setProducts,
    loading,
    error,
    brandFilter,
    setBrandFilter,
    reload: loadProducts,
    addProduct
  };
}
