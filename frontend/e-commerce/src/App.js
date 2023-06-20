import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar';
import Shop from './pages/shop/shop';
import Cart from './pages/cart/cart';
import {ShopContextProvider} from './context/shop-context';
import ReviewItem from './pages/review/review-item';
import ProductComponent from './components/ProductComponent';
import LastCheckedProductComponent from './components/LastCheckedProductComponent';
import { ProductContext, ProductContextProvider } from './context/ProductContext';
import CustomerProfile from './pages/profile/CustomerProfile';
import Login from './pages/login/Login';
import Payment from './pages/payment/Payment'
import CategoriesItem from './pages/categories/CategoriesItem';

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <ProductContextProvider>
          <Router>
            <Navbar />
            <Routes>
                <Route path='/login' element={<Login />}/>
                <Route path='/' element={<Shop />}/>
                <Route path='/cart' element={<Cart />}/>
                <Route path='/products/:id' element={<ProductComponent />}/>
                <Route path='/categories' element={<Cart />}></Route>
                <Route path='/:username/last-checked' element={<LastCheckedProductComponent />}/>
                <Route path='/:username/profile' element={<CustomerProfile />}/>
                <Route path='/:username/totalCartAmount' element={<Payment />}/>
                <Route path='/men' element={<CategoriesItem category="men"/>} />
                <Route path='/women' element={<CategoriesItem category="women"/>} />
                <Route path='/accessories' element={<CategoriesItem category="accessories"/>} />
                <Route path='/electronics' element={<CategoriesItem category="electronics"/>} />
            </Routes>
          </Router>
        </ProductContextProvider>
      </ShopContextProvider>
    </div>
  );
}

export default App;
