import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './features/counter/ProductDetail'
// import LoginPage from './features/counter/LoginPage'
import LoginData from './features/counter/loginData';
import Cartpage  from './features/counter/cartpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/product/details/:id' element={<ProductDetail />}/>
          <Route path='/user-login/page' element={<LoginData />}/>
          <Route path='/product/total/amount/:id' element={<Cartpage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
    <ToastContainer/>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
