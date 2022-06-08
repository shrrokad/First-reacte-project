import React, { useEffect, useState } from 'react'
import './Product.scss'
import loader from '../../assets/loader.gif'
import { FaTrashAlt,FaPencilAlt,FaPlus } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import {
  getalluser,
  selectProduct
} from './counterSlice';


const Productamount = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const Product = useSelector(selectProduct)
  const [products, setProducts] =useState()

  const product = JSON.parse(localStorage.getItem('productDetails'))
  const count = JSON.parse(localStorage.getItem('count'))
  const user = JSON.parse(localStorage.getItem('userData'))
  const price = (product.price * count)
  const discount = 50
  const delivery = 100
  const total = ((( price - discount ) + delivery).toFixed(2))
  console.log(user,'........user');
  console.log(products, '.......product');

  useEffect(() => {
    setProducts(product)
  }, [])

  useEffect(() => {
    dispatch(getalluser())
  }, [])

  useEffect (() => {
    console.log(Product, '........products');
  }, [Product])

  const editclick = () => {
    navigator(`/product/details/${product.id}`)
    
    toast.info(`Please Edit Your information`, {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored"
    });

  }
  
  const deleteclick = () => {
      // localStorage.removeItem('productDetails') && localStorage.removeItem('count') ?
      // 'no any item': navigator(`/`)

      toast.success("Success full, Delete Your item", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored"
      });
      
  }
  const orderbtn = () => {
    // localStorage.removeItem('productDetails') && localStorage.removeItem('count') ?
    // 'no any item': navigator(`/`)

    toast.success("👍 Successfull, your order", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored"
    });
}

const adbtn = () => {
  navigator('/')
  toast.info("🦄 please Select Second Item", {
    position: toast.POSITION.TOP_CENTER,
    theme: "colored"
  });
}

  const getdata = JSON.parse(localStorage.getItem('cartitem'))
  console.log(getdata.products,'...getdata');
  return (
    <div>
       <Navbar/>
      {
      products == undefined ? 
        <img src={loader}/> :
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='main-container-p' id='main-container-p'>
                <div>
                <h1 className='p-text'>Fack Store</h1>
                </div>
                <div className='billtext'>
                  <b>Custmore Name : </b>
                  <span style={{
                    paddingLeft : '10px'
                    }}>{user.name.firstname}</span>
                  <span style={{
                    paddingLeft : '10px'
                    }}>{user.name.lastname}.</span>
                  <br/>
                  <span>{user.address.number} ,</span>
                  <span style={{
                    paddingLeft : '10px'
                    }}>{user.address.street} ,</span>
                   <span style={{
                    paddingLeft : '10px'
                    }}>{user.address.city} ,</span>
                  <br/>
                  <span>{user.address.zipcode} ,</span>
                  <br/>
                  <b>phone : </b>
                  <span style={{
                    paddingLeft : '10px'
                    }}>{user.phone}</span>
                  </div>
                <div>
                <div className='row '>
                  <div className='col-8 border-right'>
                    <div className='row'>
                      <div className='col-4'>
                        <div>
                          <img src={product.image} className='p-image'/>
                        </div>
                      </div>
                      <div className='col-8'>
                        <div>
                          <b className='p-title'>{product.title}</b>
                          <p className='p-description'>{product.description}</p>
                          <p className='p-price'>${product.price}</p>
                        </div>
                        <button type='button' className='editebtn' onClick={editclick}>Edit <FaPencilAlt/></button>
                        <button type='button' className='closebtn' onClick={ deleteclick}>Delete <FaTrashAlt/></button>
                      </div>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div>
                      <p className='amount'>Amount Details</p>
                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        <div className='p-d-text'>
                          <h4>Produt Details</h4>
                          <p>Bage Total</p>
                          <p>Quantity</p>
                          <p>Discount</p>
                          <p style={{marginBottom: "15%"}}>Delivery Charge</p>
                          <b style={{fontSize: "20px"}}>Total Amount</b>
                        </div>
                      </div>
                      <div className='col-6'>
                        <div className='p-d-text' style={{textAlign : 'end'}}>
                          <p className='p-title'>Amount</p>
                          <p>${product.price}</p>
                          <p>{count}</p>
                          <p>{discount}</p>
                          <p style={{marginBottom: "15%"}}>{delivery}</p>
                          <b className='t-amount'>${total}</b>
                        </div>
                      </div>
                      <div>
                      <button className='orderbtn' onClick={orderbtn}>Order Now <BsFillCartCheckFill/></button>
                    </div>
                    </div>
                  </div>
                </div>
                <div>
                <button className='addbtn' onClick={adbtn}><FaPlus/> Add Product</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </div>

    
  )
}

export default Productamount
