// Hello, try
import React, { useState } from 'react'
import "../styles/Register.scss"
const RegisterPage = () => {
  const [formData, sterFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    profileImage: null
  })
  const handleChange = (e) => {
    const {name, value,files}=e.target
    setFromData({
      ...formData,
      [name]: value,
      [name]: name === 'profileImage' ? files[0]:value
    })
  }
  console.log(formData)
  return (
    <div className='register'>
      <div className='register_content'>
        <form className='register_content_form'>
          <input placeholder='First Name' name='firstName' value={formData.firstName} required />
          <input placeholder='Last Name' name='lastName'values={formData.lastName}  required />
          <input placeholder='Email' name='email' type='email' value={formData.email} required />
          <input placeholder='Password' name='password' type='password' value={formData.password} required />
          <input placeholder='Password' name='confirmPassword' type='password' value={formData.confirmPassword} required />
          <input type="file" name='profileImage' accept='image' value={formData.profileImage} required/>
          <label>
            <img src="/assets/addimage.png" alt="add profile photo" />
          </label>
          <p>Upload Your Photo!!</p>
          <button type='submit'>Register!!</button>
        </form>
        <a href="/login">Do you have a account? Login Here!!</a>
      </div>
    </div>
  )
}

export default RegisterPage