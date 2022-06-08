import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import loader from '../../assets/loader.gif'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { selectStatus } from './counterSlice';
import { FaShoppingCart } from 'react-icons/fa';
// import { toast } from 'react-toastify';
import Navbar from './Navbar'
import './Product.scss'

import { 
  increment,
  decrement,
  selectCount,
  incrementAsync,
} from "./counterSlice";
import { icons } from '@react-icons/all-files'
import { createSubscription } from 'react-redux/es/utils/Subscription'

const ProductDetail = () => {
  const { id } = useParams()
  const count = useSelector(selectCount);
  const dispatch = useDispatch()
  const status = useSelector(selectStatus);
  const [productData, setProductData] = useState([])
  const navigateion = useNavigate()
  const [Alldata, setAllData] = useState()
  const [incrementAmount, setIncrementAmount] = useState();

  useEffect(() => {
    getallproductdata()
  }, [])

  
  useEffect(() => {
    console.log(status, '........status');
  }, [status ])

  useEffect(() => {
    console.log(status, '........status');
  }, [status])

  
  const incrementValue = Number(incrementAmount) || 0;
  useEffect(() => {
      dispatch(incrementAsync(incrementValue))
  }, [])
 

  const getallproductdata = async () => {
    try {
      // console.log(id);
      const payload = await axios.get(`${process.env.REACT_APP_USERDATA}/products/${id}`)
      if (payload.status === 200) {
        console.log(payload.data, '..........payload-data');
        setProductData(payload.data)
      }

    } catch (error) {
      console.log(error);
    }
  }


  const logindetails = () => {
    localStorage.getItem('userData') == null ? navigateion(`/user-login/page`) : navigateion(`/product/total/amount/${id}`)
    localStorage.setItem('productDetails', JSON.stringify(productData))
    localStorage.setItem('count', JSON.stringify(count))
    // toast(`🤗 Thank you for purchase item`, {
    //   position: toast.POSITION.TOP_CENTER,
    // });

    

  }

 
  return (
    <>
    <Navbar/>
      <div>
        {productData == id.panding ?
            <img src={loader} className='loader' /> :
            <div className="container">
              <div className="border">
                <div className='row align-items-center margin'>
                  <div className='col-6 p-0'>
                    <div className='img'>
                      <img src={productData?.image} />
                    </div>
                  </div>
                  <div className='col-6 p-0'>
                    <div className='item'>
                      <h3 className='title-item'>{productData?.title}</h3>
                      <p className='category'>{productData?.category}</p>
                      <p className='price'>${productData?.price}</p>
                      <p className='text'>{productData?.description}</p>
                      <button 
                      className='button'
                      aria-label='increment value'
                      onClick={() => dispatch(decrement())}>
                      -
                      </button>
                      <input type="text" 
                      value={count} 
                      onChange={e => count(e.target.value)}
                      style={{
                        width : '50px',
                        textAlign : 'center'
                      }}/>
                      <button 
                      className='button'
                      aria-label='increment value'
                      onClick={() => dispatch(increment())}>
                      +
                      </button> <br />
                      <button className='cartbtn' onClick={logindetails}>Add to Cart <FaShoppingCart className='carticon'/></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         } 
      </div>
    </>
  )
}

export default ProductDetail;
