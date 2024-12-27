import clienteAxios  from "../config/axios.js";
import { createRef, useState } from "react"
import { useProduct } from "../hooks/useProduct"
import Alerta from "./Alerta.jsx";
import { toast } from "react-toastify";




export default function RegisterCategoria() {
   const nombreRef = createRef()
   const iconoRef = createRef()
  const [errores, setErrores]= useState([])

  const {registroCategoria}=useProduct()



  const handleSubmit = async e =>{
  e.preventDefault()
    const formData ={
      nombre: nombreRef.current.value,
      icono: iconoRef.current.files[0]
    }

    registroCategoria(formData, setErrores)
    nombreRef.current.value = "";
    iconoRef.current.value = null; 
 
}
  return (
    <div> 
        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
      <form onSubmit={handleSubmit} noValidate >
        {errores ? errores.map((error, i)=> <Alerta key={i}>{error}</Alerta>):null}
        {/* Nombre del producto */}
        <div className="mb-4">
          <label className="text-slate-800" htmlFor="nombre">
            Nombre de la Categoria:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            ref={nombreRef}
          
            placeholder="Nombre de la categoria"
            className="mt-2 w-full p-3 bg-gray-50 rounded"
          />
        </div>

        {/* Precio del producto */}
       

        {/* Imagen del producto */}
        <div className="mb-4">
          <label className="text-slate-800" htmlFor="icono">
            Icono:
          </label>
          <input
            type="file"
            id="icono"
            name="icono"
            accept="image/*"
            ref={iconoRef}
          
            className="mt-2 w-full p-3 bg-gray-50 rounded"
          />
        </div>

    

        {/* Botón de envío */}
        <input
          type="submit"
          value="Guardar "
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded"
        />
      </form>
    </div></div>
  )
}
