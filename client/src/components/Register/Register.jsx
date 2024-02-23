import React, { useState } from 'react';
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
export default function SignupForm() {

  const [validateError, setvalidateError] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  function takeData(event) {
    let user = { ...userData };
    user[event.target.name] = event.target.value;
    setUserData(user);
  }
  async function postData() {
    await axios.post('https://movie-app-l0g2.onrender.com/register', userData);
    setisLoading(false);
    navigate('/')
  }
  function sendData(e) {
    e.preventDefault();
    let validate = validateForm();
    if (validate.error) {
      setisLoading(false);
      setvalidateError(validate.error.details);
    }
    else {
      postData();
    }

  }
  function validateForm() {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(8).required(),
      last_name: Joi.string().min(3).max(8).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net', 'io'] } }).required(),
      password: Joi.string()
    });
    return schema.validate(userData, { abortEarly: false });
  }
  return (
    <form className='registerForm container' onSubmit={sendData}>
      <div className="row mb-4">
        <div className="col">
          <div className="form-outline">
            <label className="form-label" htmlFor="username">User Name</label>
            <input onChange={takeData} type="text" id="first_name" name='first_name' className="form-control" />
          </div>
          {validateError.length > 0 ? <div className='text-danger my-1'>
            <p>{validateError.filter((el) => el.context.label === 'first_name')[0]?.message}</p>
          </div> : ''}
        </div>
        <div className="col">
          <div className="form-outline">
            <label className="form-label" htmlFor="last_name">Last name</label>
            <input onChange={takeData} type="text" id="last_name" name='last_name' className="form-control" />
          </div>
          {validateError.length > 0 ? <div className='text-danger my-1'>
            <p>{validateError.filter((el) => el.context.label === 'last_name')[0]?.message}</p>
          </div> : ''}
        </div>
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="email">Email</label>
        <input onChange={takeData} type="email" id="email" name='email' className="form-control" />

        {validateError.length > 0 ? <div className='text-danger my-1'>
          <p>{validateError.filter((el) => el.context.label === 'email')[0]?.message}</p>
        </div> : ''}
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="password">Password</label>
        <input onChange={takeData} type="password" id="password" name='password' className="form-control" />
        {validateError.length > 0 ? <div className='text-danger my-1'>
          <p>{validateError.filter((el) => el.context.label === 'password')[0]?.message}</p>
        </div> : ''}
      </div>
      <button type="submit" className="btn btn-primary btn-block mb-4">
        {isLoading === true ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Sign up'}
      </button>
    </form>
  );
}
