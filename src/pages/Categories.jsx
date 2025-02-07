import { Link } from 'react-router-dom';
import productsData from '../data/products.json';

export default function Categories() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData.categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <p className="text-gray-600">{category.itemCount} items</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 