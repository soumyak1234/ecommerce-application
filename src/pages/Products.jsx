import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';
import { useProducts } from '../context/ProductsContext';
import { 
  AdjustmentsHorizontalIcon,
  ViewColumnsIcon,
  Squares2X2Icon 
} from '@heroicons/react/24/outline';

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { products, setSelectedCategories } = useProducts();
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(true);

  // Set the category filter when the category parameter changes
  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories([]);
    }
  }, [category, setSelectedCategories]);

  const sortProducts = (productsToSort) => {
    switch (sortBy) {
      case 'price-low':
        return [...productsToSort].sort((a, b) => a.discountPrice - b.discountPrice);
      case 'price-high':
        return [...productsToSort].sort((a, b) => b.discountPrice - a.discountPrice);
      case 'newest':
        return [...productsToSort].sort((a, b) => b.id - a.id);
      default:
        return productsToSort;
    }
  };

  const sortedProducts = sortProducts(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        {category && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{category}</h1>
            <p className="text-gray-600">
              Showing {sortedProducts.length} products in {category}
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ProductFilters />
          </div>

          {/* Products */}
          <div className="lg:w-3/4">
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <AdjustmentsHorizontalIcon className="h-5 w-5" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <div className="flex items-center gap-4 ml-auto">
                  {/* View Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setView('grid')}
                      className={`p-1 rounded-md ${
                        view === 'grid' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                      }`}
                    >
                      <Squares2X2Icon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setView('list')}
                      className={`p-1 rounded-md ${
                        view === 'list' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                      }`}
                    >
                      <ViewColumnsIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-600">
                  No products found
                </h2>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div
                className={
                  view === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    view={view}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 