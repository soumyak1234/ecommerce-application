import { useProducts } from '../context/ProductsContext';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useProducts();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.discountPrice * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some items to your cart to continue shopping</p>
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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="flex items-center p-6 border-b last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 ml-6">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-blue-600 font-medium">
                      ${item.discountPrice}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <span className="mx-4">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ${(item.discountPrice * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 mt-2"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-gray-500">
                    Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                  </p>
                )}
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 