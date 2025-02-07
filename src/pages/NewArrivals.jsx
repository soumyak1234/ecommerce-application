import { useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import productsData from '../data/products.json';

export default function NewArrivals() {
  const [sortBy, setSortBy] = useState('newest');
  
  const newProducts = productsData.products
    .filter(product => product.badge === 'New Arrival')
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">New Arrivals</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
} 