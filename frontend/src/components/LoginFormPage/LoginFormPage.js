import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { login } from '../../store/session'

import styles from './LoginForm.module.css';


const LoginFormPage = () => {
   const dispatch = useDispatch();
   const sessionUser = useSelector(state => state.session.user);

   const [credential, setCredential] = useState('');
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState([]);

   if (sessionUser) {
      return (
         <Redirect to='/' />
      );
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(login({ credential, password }))
         .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
         });
   }


   return (
      <div>
         <form onSubmit={handleSubmit}>
            <ul>
               {errors.map((error, i) => (
                  <li key={i}>{error}</li>
               ))}
            </ul>
            <label>
               Username or Email
               <input
                  type='text'
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
               />
            </label>
            <label>
               Password
               <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </label>
            <button type='submit'>Log In</button>
         </form>
      </div>
   );
};


export default LoginFormPage;
