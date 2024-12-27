
import {createRef, useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Alerta from '../components/Alerta'



export default function Login() {

  const emailRef= createRef()
  const passwordRef = createRef()

 
  const [errores, setErrores]= useState([])
  const{login}= useAuth({
    middleware: 'guest',
    url:'/inicio'
  }

     
)
 
 
 const handleSubmit=async e=>{
   e.preventDefault()
  
     const datos ={
   
       email: emailRef.current.value,
       password: passwordRef.current.value,
    
     }
     login(datos, setErrores)
 }
 
  return (
  <>
   <h1 className='text-4xl font-bold'>Iniciar Session</h1>
 <p className=''>Para crear un pedido debes de iniciar Session</p>
   <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
    <form onSubmit={handleSubmit}
    noValidate>
            {errores ? errores.map((error, i)=><Alerta key={i}>{error}</Alerta>):null}
        <div className='mb-4'>
            <label
            className='text-slate-800'
             htmlFor="email">
            Email:
            </label> 
            <input type="email"
             id='email'
             className='mt-2 w-full p-3 bg-gray-50'
             name='email'
             placeholder='Tu Email'
             ref={emailRef}
             
              />
        </div>
        <div className='mb-4'>
            <label
            className='text-slate-800'
             htmlFor="password">
            Ingresa tu Password
            </label> 
            <input type="password"
             id='password'
             className='mt-2 w-full p-3 bg-gray-50'
             name='password'
             placeholder='Tu Password'
             ref={passwordRef}
             
              />
        </div>
        

        <input type="submit" 
        value='Inicia Sesion' 
        className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5
        p-3 uppercase font-bold cursor-pointer'/>

    </form>
   </div>
   <nav className="mt-5">
    <Link to="/auth/registro">
    No tienes cuenta? Crea una
    </Link>
   </nav>
  </>
  )
}
