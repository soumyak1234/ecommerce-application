import { useProducts } from '../context/ProductsContext';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useProducts();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">Save items you like to your wishlist</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white"
                >
                  <HeartIcon className="h-6 w-6 text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-blue-600 font-medium mb-4">${item.discountPrice}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist; 