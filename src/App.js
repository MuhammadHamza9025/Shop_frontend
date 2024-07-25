
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./Pages/Login";
import Signup from './Pages/Signup'
import { useDispatch, useSelector } from "react-redux";
import About from "./Pages/About";
import Page from "./Pages/404Page";
import Adminpanel from "./Admin_panel/Adminpanel";
import Users from "./Components/Users";
import AddProducts from "./Admin_panel/AddProducts";
import AllProducts from "./Pages/AllProducts";
import Cart from './Cart/Cart'
import { useState, useEffect, } from "react";
import { setcategories, setproducts } from "./Reducers/Reducer";
import ProductDetails from "./Pages/ProductDetails";
import ShowProducts from "./Admin_panel/ShowProducts";
import PaymentSuccess from "./Cart/PaymentSuccess";

function App() {
  const [items, setitems] = useState([])
  const dispatch = useDispatch()


  useEffect(() => {

    const fetchp = async () => {
      const fetallp = await fetch('http://localhost:1000/getallproducts')
      const res = await fetallp.json()
      setitems(res.getallp)

      dispatch(setproducts(res.getallp))
    }
    fetchp()

  }, [dispatch])
  const users = useSelector(state => state.customreducer.users)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/products" element={<AllProducts />} >
          </Route>
          <Route path="/:category/:id" element={<ProductDetails />}></Route>

          <Route path="*" element={<Page />} />

          {users?.role === 'Admin' &&

            <Route path="/admin-panel" element={<Adminpanel></Adminpanel>}>
              <Route path="users" element={<Users />}></Route>
              <Route path="*" element={<Page />}></Route>
              <Route path="addproducts" element={<AddProducts />}></Route>
              <Route path="showproducts" element={<ShowProducts />}>

              </Route>
            </Route>


          }
        </Routes>





        <Footer></Footer>
      </BrowserRouter>

    </>
  );
}

export default App;
