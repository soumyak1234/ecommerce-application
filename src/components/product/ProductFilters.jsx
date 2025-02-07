import { useProducts } from '../../context/ProductsContext';
import { useSearchParams } from 'react-router-dom';
import productsData from '../../data/products.json';

export default function ProductFilters() {
  const {
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories
  } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
      searchParams.delete('category');
    } else {
      setSelectedCategories([category]);
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {productsData.categories.map(category => (
            <label key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
                className="rounded text-blue-600"
              />
              <span className="flex-1">{category.name}</span>
              <span className="text-gray-500 text-sm">({category.itemCount})</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 