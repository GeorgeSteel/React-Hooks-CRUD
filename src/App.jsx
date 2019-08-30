import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Products from './components/Products';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Product from './components/Product';
import Header from './components/Header';

function App() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect( () => {
    if (reload) {
      const requestAPI = async () => {
        const result = await axios.get('http://localhost:4000/restaurant');
        setProducts(result.data);
      }
      requestAPI();
      setReload(false);
    }
  }, [reload])

  return (
    <Router>
      <Header/>
      <main className="container mt-5">
        <Switch>
          <Route exact path="/products" 
                        render={ () => (
                          <Products
                            products={ products }
                            setReload={ setReload }
                          />
                        ) } />
          <Route exact path="/newproduct" 
                        render={ () => (
                            <AddProduct
                              setReload={ setReload }
                            />
                          )
                        } />
          <Route exact path="/products/:id" component={ Product } />
          <Route exact path="/products/update/:id" 
                        render={ ({ match: { params: { id } } }) => {
                            const IDProduct = parseInt(id);
                            const product = products.filter(product => product.id === IDProduct)
                            return (
                              <UpdateProduct
                                product={ product[0] }
                                setReload={ setReload }
                              />
                            )
                          }
                        } />
        </Switch>
      </main>
      <footer className="mt-4 p2 text-center">Todos los derechos reservados &copy;</footer>
    </Router>
  );
}

export default App;
