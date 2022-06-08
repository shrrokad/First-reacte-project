import React, { useState } from 'react'
import loader from '../../assets/loader.gif'
import axios from 'axios';
import { 
  selectCart,
  getcart,
  getalluser,
  selectProduct,
} from "./counterSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Cartpage = () => {

  const cart = useSelector(selectCart);
  const products = useSelector(selectProduct);
  const dispatch = useDispatch()
  const [ cartitem, setCartitem] = useState()
  // const [ productitem, setProductitem] = useState([])

  useEffect(() => {
    dispatch(getcart())
    // api product---------
    dispatch(getalluser())
  },[])




  useEffect(() => {
    console.log(cartitem, '------cartitem');
  }, [cartitem])

  useEffect(() => {
    console.log(cart, '..........cart');
    // api product---------
    console.log(products, '........products');
  }, [cart,products])


  const userlogindata = JSON.parse(localStorage.getItem('userData'))
  console.log(userlogindata,'userlogindata');
  
  const Apialldata = async() => {
    try {
      const payload = await axios.get(`${process.env.REACT_APP_CART}/carts`)
      if (payload.status === 200) {
        console.log(payload.data, '..........payload-data');
        // setCartitem(payload.data)

        payload.data.filter((data) => {
          if(data.userId == userlogindata.id) {
            console.log(data, '---------data');
            setCartitem(data)
          }
        })
      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    Apialldata()
    productdata()
  },[])


 function productdata() {
  products.filter((Data) => {
    if(Data.id === cartitem.products.productId){
      console.log('1324');
    }
    else{
      console.log(false);
    }
  })
 }
  
  
  return (
    <div>
      {
        cartitem == undefined ? 
        <img src={loader} className='loader'/> :
        <h1>hello</h1>
      }
    </div>
  )
}

export default Cartpage
