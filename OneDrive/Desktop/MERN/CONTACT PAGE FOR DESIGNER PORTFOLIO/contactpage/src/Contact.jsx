import React from 'react'
import {useFormik } from "formik"
import {Toaster ,toast } from "react-hot-toast"
import { registerValidate } from './validate';
import { RegisterUser } from './apicalls/contact';
import img from './assets/3dstudio.png'
import model from './assets/3dman.png'
import './App.css'
import { MdEmail ,MdPerson,MdWhatsapp,MdOutlineMessage} from 'react-icons/md';

const Contact = () => {
    // useEffect(()=>{
    //     VanillaTilt.init(document.querySelector(".contact-form"),{
          
    //     })
    // })
    const formik = useFormik({
      initialValues : {
        username : '',
        email : '',
        number : '',
        mailmessage : '',
      },
      validate : registerValidate,
      validateOnBlur : false,
      validateOnChange : false,
      onSubmit : async values =>{
        RegisterUser(values)
      toast.success('thanks for contacting me');
        values.username = '';
        values.email = '';
        values.number = '';
        values.mailmessage = '';
      },
       
    })

  return (
    <>
    <Toaster position = "top-center" reverseorder={false}></Toaster>
    <div className="parent">

      <div className="page">
      

          <div className="first">
            <img src={img}alt="" />
          <h1> WE,D LOVE TO </h1>
          <h1>HEAR FROM YOU</h1>
          <img className = "image" src={model} alt="" />
          </div>
          <div className="second">
          <div className="contact-form">
        <form action="" onSubmit={formik.handleSubmit} >
            <h1 className='header'>CONTACT ME</h1>
            <div className="input-box">
                <span className='icon'><MdPerson  size={20}/></span>
                <input {...formik.getFieldProps('username')} type="name" placeholder='FullName'/>
            </div>
            <div className="input-box">
                <span className='icon'><MdEmail size={20}/></span>
                <input {...formik.getFieldProps('email')} type="email" placeholder='Email' />
            </div>
            <div className="input-box">
                <span className='icon'><MdWhatsapp size={20}/></span>
                <input {...formik.getFieldProps('number')} type="text" placeholder='Whatsapp No.' maxLength={10}  />
            </div>
            <div className="input-box">
                <span className='icon'><MdOutlineMessage size={20}/></span>
                <textarea {...formik.getFieldProps('mailmessage')}cols="30" rows="10" placeholder='what is in your mind'></textarea>
            </div>
            <button type='submit'>Send Mail</button>


       </form>
       </div>
          </div>
       </div>
    </div>
       
    </>
  )
}

export default Contact
