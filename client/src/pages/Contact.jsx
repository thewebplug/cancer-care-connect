import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Contacts from '../components/ContactForm'

function Contact() {
  return (
    <div>
        <Header />
        <div className=' w-[800px] ml-80 my-10'>
          <h2 className=' text-2xl font-bold'>
            Contact Us
          </h2>
          <p className='my-2 text-justify'>
            We'd love to hear from you! Please leave your message below, and our team will get back to you as soon as possible. Your feedback and inquiries are important to us. Thank you for choosing Cancer Care Connect!
          </p>
        </div>
        <Contacts />
        <Footer />
    </div>
  )
}

export default Contact