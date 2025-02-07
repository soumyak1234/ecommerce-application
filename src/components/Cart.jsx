import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center py-4 border-b">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex items-center">
              <button
                className="px-2 py-1 border rounded-l"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
              <button
                className="px-2 py-1 border rounded-r"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 text-right">
          <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
          <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
