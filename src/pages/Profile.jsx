import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  UserIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  CogIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    activeTab === 'wishlist' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <HeartIcon className="h-5 w-5" />
                  <span>Wishlist</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <CogIcon className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 p-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Profile Information</h2>
                    <button
                      onClick={() => setEditing(!editing)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {editing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  
                  {editing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Name</h3>
                        <p className="mt-1">{user?.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p className="mt-1">{user?.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                        <p className="mt-1">{user?.phone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Address</h3>
                        <p className="mt-1">{user?.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Order History</h2>
                  {/* Add order history component here */}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
                  {/* Add wishlist component here */}
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  {/* Add settings component here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 