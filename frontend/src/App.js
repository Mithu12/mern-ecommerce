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

const App = () => {
  return (
    <Router>
      <Header/>
      <main>
          <Container>
              <Route path='/' component={HomeScreen} exact/>
              <Route path='/product/:id' component={ProductScreen} exact/>
              <Route path='/login' component={LoginScreen} exact/>
              <Route path='/profile' component={ProfileScreen} exact/>
              <Route path='/register' component={SignUpScreen} exact/>
              <Route path='/cart/:id?' component={CartScreen}/>
          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
