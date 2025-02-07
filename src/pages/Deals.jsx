import { useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import productsData from '../data/products.json';

export default function Deals() {
  const [sortBy, setSortBy] = useState('discount');
  
  const dealsProducts = productsData.products.filter(
    product => product.price > product.discountPrice
  ).sort((a, b) => {
    const discountA = (a.price - a.discountPrice) / a.price;
    const discountB = (b.price - b.discountPrice) / b.price;
    return discountB - discountA;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">Today's Deals</h1>
          <p className="text-gray-600">Great savings on amazing products!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dealsProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
} 