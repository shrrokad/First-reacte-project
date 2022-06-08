import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import loader from '../../assets/loader.gif'
import Navbar from './Navbar';

import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  selectStatus,
  getalluser,
  selectProduct
} from './counterSlice';
import styles from './Counter.module.css';
import './Product.scss'
import { Link } from 'react-router-dom';

export function Counter() {
  const count = useSelector(selectCount);
  const status = useSelector(selectStatus);
  const products = useSelector(selectProduct);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  useEffect(() => {
    dispatch(getalluser())
  }, [])

  useEffect (() => {
    console.log(status, '........status');
    console.log(products, '........products');
  }, [products,status])
  const incrementValue = Number(incrementAmount) || 0;



  return (
    // <div className={styles.row}>
    <>
     <Navbar/>
    {
    status ? 
      <img src={loader} className='loader'/> :
      <div>
        {
          products.length > 0 ?
          <div>
          <div className={styles.row}>
          <div className='product-wrapper'>
            {products.map((product, index) => (
              <Link to={`/product/details/${product.id}`} >
            <div className='product-card' key={`product_${index}`}>
              <div className='main-container'>
              <img src={product.image} className='images'/>
              </div>
              <div className='card-body'>
                <b className='card-Text'>{product.category}</b>
                <p className='card-text'>{product.title}</p>
                <b className='card-price'>$ {product.price}</b>
              </div>
              <div> 
              </div>
            </div>
            </Link>
            ))}
          </div>
          </div>
          </div>
          : "No Product Found"
      }
      </div>
    } 
  </>
  );
}
