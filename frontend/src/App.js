import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProfileScreen from "./screens/profileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";

const App = () => {
  return (
    <Router>
      <Header/>
      <main>
          <Container>

               {/*public routes*/}
              <Route path='/' component={HomeScreen} exact/>
              <Route path='/product/:id' component={ProductScreen} exact/>
              <Route path='/login' component={LoginScreen} exact/>
              <Route path='/register' component={SignUpScreen} exact/>
              <Route path='/cart/:id?' component={CartScreen}/>

               {/*user routes*/}
              <Route path='/orders/:id?' component={OrderDetailsScreen}/>
              <Route path='/shipping' component={ShippingScreen} exact/>
              <Route path='/payment' component={PaymentScreen} exact/>
              <Route path='/placeorder' component={PlaceOrderScreen} exact/>
              <Route path='/profile' component={ProfileScreen} exact/>

               {/*====== admin routes*/}
              <Route path='/admin/users/list' component={UserListScreen}/>
              <Route path='/admin/users/:id/edit' component={UserEditScreen}/>
              <Route path='/admin/products/list' component={ProductListScreen}/>
              <Route path='/admin/orders/list' component={UserListScreen}/>

          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
