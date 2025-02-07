import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useProducts } from '../../context/ProductsContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useProducts();
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000); // Reset button after 1 second
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the heart icon
    toggleWishlist(product);
  };

  const discount = Math.round(((product.price - product.discountPrice) / product.price) * 100);

  return (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {product.badge}
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white z-10"
      >
        {isWishlisted ? (
          <HeartSolidIcon className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5 text-gray-600" />
        )}
      </button>

      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <span className="text-xl font-bold text-blue-600">
            ${product.discountPrice}
          </span>
          {discount > 0 && (
            <>
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.price}
              </span>
              <span className="ml-2 text-sm text-green-500">
                {discount}% off
              </span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              isAdding
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
} 