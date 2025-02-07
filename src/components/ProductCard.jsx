import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-2 flex items-center">
          <span className="text-yellow-500">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="text-gray-400">{'★'.repeat(5 - Math.floor(product.rating))}</span>
          <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
