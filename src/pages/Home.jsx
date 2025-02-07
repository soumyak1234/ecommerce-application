import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import productsData from '../data/products.json';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setProducts(productsData.products);
    setCategories(productsData.categories);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Shop the latest trends with unbeatable prices and exclusive deals
            </p>
            <div className="flex gap-4">
              <Link
                to="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/deals"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                View Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-blue-600 hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative overflow-hidden rounded-lg shadow-lg aspect-w-16 aspect-h-9"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p>{category.itemCount} Items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Summer Sale</h3>
              <p className="mb-4">Get up to 50% off on selected items</p>
              <Link
                to="/sale"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Shop Now
              </Link>
            </div>
            <div className="bg-purple-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">New Arrivals</h3>
              <p className="mb-4">Check out our latest collection</p>
              <Link
                to="/new"
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
