import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Layouts/Navbar';
import Store from './Components/Store/Store';
import Men from './Components/Men/Men';
import Woman from './Components/Woman/Woman';
import HomeAndLiving from './Components/HomeAndLiving/HomeAndLiving';
import Kids from './Components/Kids/Kids';
import PrivatePage from './Components/Private/PrivatePages';
import Profile from './Components/Private/Profile/Profile';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Private/Cart/Cart';
import AddProduct from './Components/Admin/AddProduct/AddProduct';
import Preview from './Components/Preview/Preview';
import UpdateProduct from './Components/Admin/updateProduct/UpdateProduct';
import AdminPages from './Components/Admin/AdminPages';
import Contact from './Components/Contact/Contact';
import ContactList from './Components/Admin/Contact-List/ContactList';
import Order from './Components/Private/Order/Order';
import MyOrders from './Components/Private/Order/MyOrders';
import CompleteOrderDetails from './Components/Private/Order/CompleteOrderDetails';
import AllOrders from './Components/Admin/All-Orders/AllOrders';
import MoreDetails from './Components/Admin/All-Orders/MoreDetails';
import Footer from './Components/Layouts/Footer';
import Dashboard from './Components/Admin/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route element={<PrivatePage />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/mycart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/completeorderdetails' element={<CompleteOrderDetails />} />
        </Route>


        <Route path='/' element={<Store />} />
        <Route path='/men' element={<Men />} />
        <Route path='/women' element={<Woman />} />
        <Route path='/kids' element={<Kids />} />
        <Route path='/homeandliving' element={<HomeAndLiving />} />
        <Route path='/preview/:id' element={<Preview />} />
        <Route path='admin/dashboard/' element={<Dashboard />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contactus' element={<Contact />} />


        <Route element={<AdminPages />}>
          <Route path='/admin/contactlist' element={<ContactList />} />
          <Route path='/admin/addproduct' element={<AddProduct />} />
          <Route path='admin/updateproduct/:id' element={<UpdateProduct />} />
          <Route path='admin/allorder/' element={<AllOrders />} />
          <Route path='admin/orderdetails/' element={<MoreDetails />} />
          

        </Route>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
