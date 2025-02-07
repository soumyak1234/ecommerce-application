import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  UserIcon, 
  HeartIcon, 
  MagnifyingGlassIcon,
  PhoneIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { useProducts } from '../../context/ProductsContext';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, wishlist } = useProducts();
  const { user } = useAuth();

  // Calculate total items in cart
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <Link to="/contact" className="flex items-center hover:text-gray-300">
              <PhoneIcon className="h-4 w-4 mr-1" />
              <span>Contact</span>
            </Link>
            <Link to="/help" className="flex items-center hover:text-gray-300">
              <QuestionMarkCircleIcon className="h-4 w-4 mr-1" />
              <span>Help</span>
            </Link>
          </div>
          <div>
            <span>Free shipping on orders over $100!</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Minimarket
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="relative">
              <HeartIcon className="h-6 w-6 text-gray-600 hover:text-blue-500" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingBagIcon className="h-6 w-6 text-gray-600 hover:text-blue-500" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link to={user ? "/profile" : "/login"}>
              <UserIcon className="h-6 w-6 text-gray-600 hover:text-blue-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t">
        <div className="container mx-auto px-4">
          <nav className="py-3">
            <ul className="flex items-center space-x-8">
              <li>
                <Link to="/categories" className="hover:text-blue-500 font-medium">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-blue-500 font-medium">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-blue-500 font-medium">
                  Deals
                </Link>
              </li>
              <li>
                <Link to="/clearance" className="hover:text-blue-500 font-medium">
                  Clearance
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 