import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductsProvider } from './context/ProductsContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Categories from './pages/Categories';
import Clearance from './pages/Clearance';
import NewArrivals from './pages/NewArrivals';
import Deals from './pages/Deals';
import { Link } from 'react-router-dom';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/help" element={<Help />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/clearance" element={<Clearance />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/deals" element={<Deals />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                {/* Catch all route for 404 */}
                <Route path="*" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                      <p className="text-gray-600 mb-4">Page not found</p>
                      <Link to="/" className="text-blue-600 hover:text-blue-700">
                        Go back home
                      </Link>
                    </div>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
