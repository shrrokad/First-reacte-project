import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Product.scss'
import { FaShoppingCart } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";


const Navbar = () => {
    const navigate = useNavigate()

   const getitem = JSON.parse(localStorage.getItem('productDetails'))
//    console.log(getitem,'....getitem');

    const signinbtn = () => {
        navigate(`/user-login/page`)
    }

    const cartbtn = () => {
        navigate(`/product/total/amount/${getitem.id}`)
    }
  return (
    <div>
        <nav className='Navbar'>
            <div className='container'>
                <div className='m-container'>
                    <div>
                        <Link to={`/`} className='logo'>F<span>ack</span>  s<span>tore</span></Link>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <Link to={`/`}>All Products</Link>
                            </li>
                            <li>
                                <Link to={`/`}>Men's</Link>
                            </li>
                            <li>
                                <Link to={`/`}>Woman</Link>
                            </li>
                            <li>
                                <Link to={`/`}>Jewellery</Link>
                            </li>
                            <li>
                                <Link to={`/`}>Electronics</Link>
                            </li>
                            <li>
                                <button className='sign-btn' onClick={signinbtn}>Sign in <GoSignIn/></button>
                            </li>
                            <li>
                                <button className='cart position-relative' onClick={cartbtn}><FaShoppingCart />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    +1</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar;
