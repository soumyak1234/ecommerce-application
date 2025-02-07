import { useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import { TagIcon } from '@heroicons/react/24/solid';
import productsData from '../data/products.json';

function Clearance() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const clearanceProducts = productsData.products.map(product => ({
    ...product,
    clearancePrice: product.price * 0.4, // 60% off for clearance
    originalPrice: product.price
  }));

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-yellow-100 rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TagIcon className="h-8 w-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-yellow-800">Clearance Sale</h1>
          </div>
          <p className="text-yellow-700 text-lg">
            Up to 60% off! Final sale items - no returns or exchanges.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                {productsData.categories.map(category => (
                  <label key={category.id} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="rounded text-blue-600"
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {clearanceProducts.map(product => (
                <div key={product.id} className="relative">
                  <div className="absolute top-2 left-2 z-10 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                    Clearance
                  </div>
                  <ProductCard
                    product={{
                      ...product,
                      price: product.clearancePrice,
                      discountPrice: product.clearancePrice,
                    }}
                  />
                  <div className="mt-2 text-center">
                    <span className="text-sm text-gray-500 line-through">
                      Original: ${product.originalPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clearance; 