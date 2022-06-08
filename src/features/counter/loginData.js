import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik,Form, Field, ErrorMessage} from 'formik'
import loader from '../../assets/loader.gif'
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import {
    getuser,
    selectUser,
    selectStatus,
} from './counterSlice'
import { useNavigate } from 'react-router-dom'

const LoginData = () => {
    const navigate = useNavigate()
    const status = useSelector(selectStatus)
    const users = useSelector(selectUser)
    const [userData, setUserData] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getuser())
    }, [])

    useEffect(() => {
    console.log(status, '........status');
        console.log(users, '.......users');
        setUserData(users)
    }, [users,status]);

    console.log(userData,'......userData');

    const  initialValues = ({
        username: '',
        email: '',
        password: ''
      }) 
    
      const onSubmit = values => {
        console.log(values, '.......values');
        let mydata = []
         userData.filter((data) => {
          if(data.username == values.username && data.email == values.email && data.password == values.password) {
            mydata.push(data)
            localStorage.setItem('userData', JSON.stringify(data))
            navigate(`/`)
          }
          console.log(mydata, '....mydata');
        })
        toast.success("👍 Successfull, Login your Account", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored"
          });
        
      }
    
      
      const  validate = values => {
        let errors = {};
    
        if (!values.username) {
          errors.username = 'Required'
        }
    
        if(!values.email){
          errors.email = 'Requierd'
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-z]{2,4}$/i.test(values.email)){
          errors.email = 'Invalid email address'
        }

        if(!values.password) {
            errors.password = 'Requierd'
        }
        return errors;
      }


  return (
    <div>
        {status ? 
            <img src={loader} className='loader'/> :
        <div>
            {
                users.length > 0 ?
                    <Formik 
                        initialValues={initialValues}
                        validate={validate}
                        onSubmit={onSubmit}
                    >
                    <div className='container'>
                        <div className='row'>
                            <div className='main-conteiner'>
                                <div className='col-6 controlbox'>
                                    <Form>
                                        <h1 className='maintext'>Login Form</h1>
                                        <p className='childtext'>Fill the textbox. Enter your information for purchase any item</p>
                                        <div className='mb-3'>
                                            <label htmlFor='username' className='form-label'>Username</label>
                                            <Field 
                                                type='text' 
                                                name="username" 
                                                className='form-control'
                                            />
                                            <ErrorMessage name='username' component={'div'} className='text-colore'/>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='email' className='form-label'>Email</label>
                                            <Field 
                                                type='email' 
                                                name="email" 
                                                className='form-control'/>
                                            <ErrorMessage name='email' component={'div'} className='text-colore'/>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='password' className='form-label'>Password</label>
                                            <Field 
                                                type='password' 
                                                name="password" 
                                                className='form-control'/>
                                            <ErrorMessage name='password' component={'div'} className='text-colore'/>
                                        </div>
                                        <div className='button1'>
                                            <button type='submit'>Submit <FaSignInAlt /></button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Formik> :
                'No More Found!'
            }
        </div>
    }      
    </div>
  )
}

export default LoginData
