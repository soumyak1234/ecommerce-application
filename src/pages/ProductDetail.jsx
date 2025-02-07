import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  HeartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import productsData from '../data/products.json';

function ProductDetail() {
  const { id } = useParams();
  const product = productsData.products.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const discount = Math.round(((product.price - product.discountPrice) / product.price) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {product.badge && (
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviews} reviews
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.discountPrice}
                </span>
                {product.discountPrice < product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.price}
                    </span>
                    <span className="text-sm text-green-500 font-medium">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600">{product.description}</p>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color
                          ? 'border-blue-500'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                  <ShoppingBagIcon className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  {isWishlisted ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Features */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <TruckIcon className="h-6 w-6 text-gray-400" />
                  <div>
                    <h4 className="font-medium">Free Delivery</h4>
                    <p className="text-sm text-gray-600">Orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
                  <div>
                    <h4 className="font-medium">2 Year Warranty</h4>
                    <p className="text-sm text-gray-600">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ArrowPathIcon className="h-6 w-6 text-gray-400" />
                  <div>
                    <h4 className="font-medium">30 Days Return</h4>
                    <p className="text-sm text-gray-600">If goods have problems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Features */}
          <div className="border-t p-8">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 