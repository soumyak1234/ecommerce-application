import { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setProducts(productsData.products);
    setFilteredProducts(productsData.products);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, priceRange, selectedCategories]);

  const filterProducts = () => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(
      product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === product.id);
      if (exists) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity === 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products: filteredProducts,
        searchQuery,
        setSearchQuery,
        priceRange,
        setPriceRange,
        selectedCategories,
        setSelectedCategories,
        cart,
        addToCart,
        removeFromCart,
        wishlist,
        toggleWishlist,
        updateCartQuantity,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
} 